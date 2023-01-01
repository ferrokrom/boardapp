using Entities.DTO;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IBoardService:IService<Board>
    {
       Task<Board> InitialBoardAssign(User user);
        Task<IEnumerable<User>> GetBoardUsers(Guid boardId);
        Task<User> AddUserToBoard(Guid userId, Guid boardId);
        Task<Board> DeleteBoard(Guid boardid);
        Task <User> RemoveUserFromBoard(Guid userId, Guid boardId);
        Task<Board> UpdateBoard(Guid boardId, UpdateBoardDTO board);
        Task<Board> CreateBoard(Guid boardId, CreateBoardDTO board);
        Task<Board> GetBoard(Guid boardId);
        IEnumerable<Board> GetBoardByUserId(Guid userId);
    }
}
