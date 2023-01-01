using Entities.DTO;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface ICommentService:IService<Comment>
    {
        Task<Comment> NewComment(CommentDTO commentDTO, Guid userId, Guid todoId);
        Task<Comment> DeleteComment(Guid commentId);
        Task<Comment> UpdateComment(Guid commentId, CustomCommentUpdate commentBody);
        Task<Comment> GetCommentsById(Guid commentId);
        Task<IEnumerable<Comment>> GetCommentsByTodoId(Guid todoId);
        Task<IEnumerable<Comment>> GetCommentsByUserId(Guid userId);
    }
}
