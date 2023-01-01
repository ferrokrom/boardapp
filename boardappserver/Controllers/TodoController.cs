using boardappserver.Filters;
using Business.Abstract;
using Entities.DTO;
using Entities.Models;

using Microsoft.AspNetCore.Mvc;

namespace boardappserver.Controllers
{
    [Route("todo")]
    [ApiController]
    public class TodoController : CustomeBaseController
    {
        private readonly ITodoService _todoService;

        public TodoController(ITodoService todoService)
        {
            _todoService = todoService;
        }

        [HttpPost("create")]
        [ServiceFilter(typeof(ValidationFilterAttribute<UserDTO>))]
        public async Task<IActionResult> TodoCreate(TodoDTO todoDto, Guid sectionId) 
        {
            var todos =  await _todoService.NewTodo(todoDto,sectionId);
            return CreateAnActionResult(CustomResponseDTO<TodoCreateResponseDTO>.Success(200, todos));
        }
        [HttpGet("get")]
        public async Task<IActionResult> GetTodos(Guid sectionId)
        {
            var todos = await _todoService.GetTodosBySectionId(sectionId);
            return CreateAnActionResult(CustomResponseDTO<IEnumerable<TodoCreateResponseDTO>>.Success(200, todos));
        }
        [HttpGet("gettodosbyboardid")]
        public async Task<IActionResult> GetTodosByBoardId(Guid boardId)
        {
            var todos = await _todoService.GetTodosByBoardId(boardId);

            return CreateAnActionResult(CustomResponseDTO<IEnumerable<Todo>>.Success(200, todos));
        }
        [HttpGet("gettodosbyuserid")]
        public async Task<IActionResult> GetTodosByUserId(Guid userId)
        {
            var todos = await _todoService.GetTodosByUserId(userId);

            return CreateAnActionResult(CustomResponseDTO<IEnumerable<Todo>>.Success(200, todos));
        }
        [HttpGet("getTodo")]
        public async Task<IActionResult> GetTodo(Guid todoId)
        {
            var todo = await _todoService.GetTodosById(todoId);
            return CreateAnActionResult(CustomResponseDTO<Todo>.Success(200, todo));
        }
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteTodo(Guid todoId)
        {
            var todo = await _todoService.DeleteTodo(todoId);
            return CreateAnActionResult(CustomResponseDTO<Todo>.Success(200, todo));
        }
        [HttpPut("update")]
        public async Task<IActionResult> UpdateTodo(Guid todoId,[FromBody] CustomTodoUpdate todoBody)
        {
            var todo = await _todoService.UpdateTodo(todoId, todoBody);
            return CreateAnActionResult(CustomResponseDTO<Todo>.Success(200, todo));
        }
    }

}
