using Entities.DTO;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface ITodoService:IService<Todo>
    {
        Task<TodoCreateResponseDTO> NewTodo(TodoDTO todoDto, Guid sectionId);
        Task<IEnumerable<TodoCreateResponseDTO>> GetTodosBySectionId(Guid sectionId);
        Task<Todo> DeleteTodo(Guid todoId);
        Task<Todo> UpdateTodo(Guid todoId, CustomTodoUpdate todoBody);
        Task<Todo> GetTodosById(Guid todoId);
        Task<IEnumerable<Todo>> GetTodosByBoardId(Guid boardId);
        Task<IEnumerable<Todo>> GetTodosByUserId(Guid userId);
    }
}
