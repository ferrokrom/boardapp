using AutoMapper;
using Business.Abstract;
using DataAccess.Abstract;
using DataAccess.Concrete;
using Entities.DTO;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace Business.Concrete
{
    public class TodoService : Service<Todo>, ITodoService
    {
        private readonly IMapper _mapper;
        private readonly ITodoRepository _todoRepository;
        private readonly ISectionRepository _sectionRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITodoUserRepository _todoUserRepository;
        private readonly IBoardRepository _boardRepository;

        public TodoService(IGenericRepository<Todo> repository,
                            ISectionRepository sectionRepository, 
                            ITodoRepository trepository, 
                            IMapper mapper,
                            IBoardRepository boardRepository,
                            ITodoUserRepository todoUserRepository,
                            IUnitOfWork unitOfWork) : base(repository,unitOfWork)
        {
            _mapper = mapper;
            _todoRepository = trepository;
            _sectionRepository = sectionRepository;
            _unitOfWork= unitOfWork;
            _todoUserRepository= todoUserRepository;
            _boardRepository= boardRepository;
        }

        public async Task<TodoCreateResponseDTO> NewTodo(TodoDTO todoDto,Guid sectionId)
        {
            Todo todo = new Todo();
            todo.Id = Guid.NewGuid();
            todo.Title = todoDto.Title;
            todo.CreatedAt = DateTime.Now;
            todo.Duedate =DateTime.Now;
            
           
            var section = _sectionRepository.Get(s => s.Id.Equals(sectionId)).Include(t => t.Todos).FirstOrDefault();
            if (section != null) 
            {
                section.Todos.Add(todo);
            }
            await _todoRepository.Create(todo);
            await _unitOfWork.CommitAsync();
            var td = _todoRepository.Get(x => x.Id == todo.Id).First();


            var responseDTO = _mapper.Map<TodoCreateResponseDTO>(td);
            responseDTO.SectionId = sectionId;
            Console.WriteLine(responseDTO.SectionId);

            return responseDTO;
        }
        public async Task<IEnumerable<TodoCreateResponseDTO>> GetTodosBySectionId(Guid sectionId) 
        {
            try
            {
                List<TodoCreateResponseDTO> responseDTOs = new List<TodoCreateResponseDTO>();

                var todos = _todoRepository.Get(x => x.Section.Id.Equals(sectionId))
                    .Include(s => s.Section)
                    .Include(s => s.TodoUsers)
                    .ThenInclude(a => a.User)
                    .ToList();

                foreach (var item in todos)
                {
                    item.Section.Id = sectionId;
                    responseDTOs.Add(_mapper.Map<TodoCreateResponseDTO>(item));
                }

                return responseDTOs;
            }
            catch (Exception ex)
            {
                return new List<TodoCreateResponseDTO>();
            }
        }
        public async Task<Todo>  DeleteTodo(Guid todoId)
        {
            try
            {
                var todoUsers = _todoUserRepository.Get(s => s.TodoId.Equals(todoId)).ToList();
                var todo = _todoRepository.Get(x => x.Id.Equals(todoId)).FirstOrDefault();
                if (todo == null)
                {
                    throw new Exception("Todo not found");
                }

                _todoUserRepository.DeleteRange(todoUsers);
                _todoRepository.Delete(todo);
                await _unitOfWork.CommitAsync();

                return todo;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<Todo> UpdateTodo(Guid todoId,[FromBody] CustomTodoUpdate tBody) 
        {
            try
            {
                var todo = _todoRepository.Get(t => t.Id.Equals(todoId)).FirstOrDefault();
                if (todo == null)
                {
                    throw new Exception("Todo not found");
                }

                todo.Duedate = tBody.DueDate;
                todo.IsCompleted = tBody.IsCompleted;
                todo.Title = tBody.Title;
                todo.Description = tBody.Description;
                todo.UpdatedAt = DateTime.Now;

                _todoRepository.Update(todo);
                await _unitOfWork.CommitAsync();

                return todo;
            }
            catch (Exception ex)
            {
                return null;
}
        }

        public async Task<Todo> GetTodosById(Guid todoId)
        {
            try
            {
                var todo = _todoRepository.Get(x => x.Id.Equals(todoId))
                    .Include(t => t.TodoUsers)
                    .ThenInclude(x => x.User)
                    .FirstOrDefault();
                if (todo == null)
                {
                    throw new Exception("Todo not found");
                }
                return todo;
            }
            catch (Exception ex)
            {
                // Log the exception and return null
                return null;
            }
        }

        public async Task<IEnumerable<Todo>> GetTodosByBoardId(Guid boardId)
        {
            var todos = _sectionRepository.Get(x => x.Board.Id.Equals(boardId)).SelectMany(x => x.Todos).Include(x=>x.Section);

            return todos;
        }
        public async Task<IEnumerable<Todo>> GetTodosByUserId(Guid userId)
        {
            var todos = _todoUserRepository.Get(x => x.UserId.Equals(userId)).Include(t => t.Todo.Section).Include(x=>x.Todo.TodoUsers).
                ThenInclude(a=>a.User).Select(tu=>tu.Todo).ToList();

            return todos;
        }
    }
}
