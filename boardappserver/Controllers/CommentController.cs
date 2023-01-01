using boardappserver.Filters;
using Business.Abstract;
using Entities.DTO;
using Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace boardappserver.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : CustomeBaseController
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpPost("create")]
        [ServiceFilter(typeof(ValidationFilterAttribute<UserDTO>))]
        public async Task<IActionResult> NewComment(CommentDTO commentDTO, Guid todoId,Guid userId)
        {
            var comment = await _commentService.NewComment(commentDTO, todoId, userId);
            return CreateAnActionResult(CustomResponseDTO<Comment>.Success(200, comment));
        }

        [HttpGet("getcommentsbytodoid")]
        public async Task<IActionResult> GetCommentsByTodoId(Guid todoId)
        {
            var comments = await _commentService.GetCommentsByTodoId(todoId);

            return CreateAnActionResult(CustomResponseDTO<IEnumerable<Comment>>.Success(200, comments));
        }
        [HttpGet("getcommentsbyuserid")]
        public async Task<IActionResult> GetTodosByUserId(Guid todoId)
        {
            var comments = await _commentService.GetCommentsByTodoId(todoId);

            return CreateAnActionResult(CustomResponseDTO<IEnumerable<Comment>>.Success(200, comments));
        }
        [HttpGet("getcomment")]
        public async Task<IActionResult> GetComment(Guid commentId)
        {
            var comment = await _commentService.GetCommentsById(commentId);
            return CreateAnActionResult(CustomResponseDTO<Comment>.Success(200, comment));
        }
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteTodo(Guid commentId)
        {
            var comment = await _commentService.DeleteComment(commentId);
            return CreateAnActionResult(CustomResponseDTO<Comment>.Success(200, comment));
        }
        [HttpPut("update")]
        public async Task<IActionResult> UpdateTodo(Guid commentId, [FromBody] CustomCommentUpdate commentBody)
        {
            var comment = await _commentService.UpdateComment(commentId, commentBody);
            return CreateAnActionResult(CustomResponseDTO<Comment>.Success(200, comment));
        }
    }
}
