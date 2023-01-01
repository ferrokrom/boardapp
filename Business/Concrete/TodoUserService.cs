using Business.Abstract;
using DataAccess.Abstract;
using DataAccess.Concrete;
using Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace Business.Concrete
{
    public class TodoUserService : Service<TodoUser>, ITodoUserService

    {
        private readonly ITodoUserRepository _todoUserRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserRepository _userRepository;
        private readonly ITodoRepository _todoRepository;
        public TodoUserService(ITodoRepository todoRepository,IUserRepository userRepository,ITodoUserRepository todoUserRepository,IGenericRepository<TodoUser> repository, IUnitOfWork unitOfWork) : base(repository, unitOfWork)
        {
            _todoUserRepository = todoUserRepository;
            _unitOfWork = unitOfWork;
            _userRepository = userRepository;
            _todoRepository = todoRepository;
        }
        public async Task<TodoUser> AddTodoToUser(Guid userId, Guid todoId)
        {
            var user = _userRepository.Get(s => s.Id.Equals(userId)).FirstOrDefault();
            var todo = _todoRepository.Get(s => s.Id.Equals(todoId)).Include(a => a.TodoUsers).FirstOrDefault();
            var todoiser = new TodoUser() {
                User = user,
                Todo = todo
            };
            todo.TodoUsers.Add(todoiser);
            await _unitOfWork.CommitAsync();


            return todoiser;
        }
        public async Task<TodoUser> RemoveUserFromTodoUser(Guid userId, Guid todoId) 
        {
            var todoUser = _todoUserRepository.Get(x => x.UserId.Equals(userId) && x.TodoId.Equals(todoId)).FirstOrDefault();
            var todo = _todoRepository.Get(s => s.Id.Equals(todoId)).Include(a => a.TodoUsers).FirstOrDefault();
            todo.TodoUsers.Remove(todoUser);
            await _unitOfWork.CommitAsync();
            return todoUser;
        }
    }
}
