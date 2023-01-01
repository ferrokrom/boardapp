using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface ITodoUserService: IService<TodoUser> 
    {
        Task<TodoUser> AddTodoToUser(Guid userId, Guid todoId);
        Task<TodoUser> RemoveUserFromTodoUser(Guid userId, Guid todoId);
    }
}
