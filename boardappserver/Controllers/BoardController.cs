using Business.Abstract;
using Business.Exceptions;
using Entities.DTO;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;


namespace boardappserver.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoardController : CustomeBaseController
    {
        private readonly IBoardService _boardService;

        public BoardController(IBoardService boardService)
        {
            _boardService = boardService;
        }
        [HttpGet("getboardusers")]
        public async Task<IActionResult> GetBoardUsers(Guid boardId) 
        {
            var boardUsers = await _boardService.GetBoardUsers(boardId);
            return CreateAnActionResult(CustomResponseDTO<IEnumerable<User>>.Success(200, boardUsers));
        }
        [HttpGet("getboard")]
        public async Task<IActionResult> GetBoard(Guid boardId)
        {
            var board = await _boardService.GetBoard(boardId);

            return CreateAnActionResult(CustomResponseDTO<Board>.Success(200, board));
        }
        [HttpGet("getboardbyuserid")]
        public async Task<IActionResult> GetBoardByUserId(Guid userId)
        {
            var boards = _boardService.GetBoardByUserId(userId);

            return CreateAnActionResult(CustomResponseDTO<IEnumerable<Board>>.Success(200, boards));
        }
 


        [HttpPost("addusertoboard")]
        public async Task<IActionResult> AddUserToBoard(Guid userId, Guid boardid) 
        {
            var boardusers = await _boardService.AddUserToBoard(userId, boardid);

            return CreateAnActionResult(CustomResponseDTO<User>.Success(200, boardusers));

        }
        [HttpDelete("removeuserfromboard")]
        public async Task<IActionResult> RemoveUserFromBoard(Guid boardId, Guid userId)
        {
            var user = await _boardService.RemoveUserFromBoard(userId, boardId);
            if (user == null)
            {
                throw new ClientSideException("Board Not Found");
            }
            return CreateAnActionResult(CustomResponseDTO<Guid>.Success(200, userId));

        }
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteBoard(Guid boardid)
        {   
         
            var board = await _boardService.DeleteBoard(boardid);

            if (board == null) 
            {
                throw new ClientSideException("Board Not Found");
            }

            return CreateAnActionResult(CustomResponseDTO<Board>.Success(200, board));

        }
        [HttpPut("updateboard")]
        public async Task<IActionResult> UpdateBoard(Guid boardId,[FromBody] UpdateBoardDTO board)
        {
  
            var updatedBoard = await _boardService.UpdateBoard(boardId, board);
            if (updatedBoard == null)
            {
                throw new ClientSideException("Board Not Found");
            }
            return CreateAnActionResult(CustomResponseDTO<Board>.Success(200, updatedBoard));
        }
        [HttpPost("createboard")]
        public async Task<IActionResult> CreateBoard(Guid userId, [FromBody] CreateBoardDTO board)
        {

            var createdBoard = await _boardService.CreateBoard(userId, board);
            if (createdBoard == null)
            {
                throw new ClientSideException("Board Not Found");
            }
            return CreateAnActionResult(CustomResponseDTO<Board>.Success(200, createdBoard));
        }
    }
}
