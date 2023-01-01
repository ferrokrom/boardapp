using boardappserver.Filters;
using boardappserver.Middlerwares;
using Business.Abstract;
using Entities.DTO;
using Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace boardappserver.Controllers
{
    [Route("user")]
    [ApiController]

    public class UserController : CustomeBaseController
    {
        private readonly IUserService _userservice;
        private readonly ITodoUserService _todoUserService;

        public UserController(IUserService userservice, ITodoUserService todoUserService)
        {
            _userservice = userservice;
            _todoUserService = todoUserService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateUser(User user) 
        {
          
           await _userservice.Create(user);

            return Ok(user);
        }
        [HttpGet("get")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userservice.GetAll();
            return CreateAnActionResult(CustomResponseDTO<IEnumerable<User>>.Success(200, users));
        }

        [HttpGet("getuserbyid")]
        public async Task<IActionResult> GetUserById(Guid id)
        {

            var x = await _userservice.GetById(id);
            return Ok(x);
        }
        [HttpGet("getuserbyidwithtables")]
        public async Task<IActionResult> GetUserWithTables(Guid id)
        {

            var x = await _userservice.GetUserWithFields(id);
            return Ok(x);
        }
        [HttpPost("createboard")]
        public async Task<IActionResult> Create(Guid userId,[FromBody] CreateBoardDTO boardCrateDTO) 
        {
            var x = await _userservice.AddNewBoardToUser(userId, boardCrateDTO);
            return Ok(x);
        }
        [HttpPost("createmessage")]
        public async Task<IActionResult> CreateMessage(Guid senderId, [FromBody] MessageBodyDTO messageBody)
        {
            var messages = await _userservice.CreateMessage(senderId,messageBody);
            return CreateAnActionResult(CustomResponseDTO<Message>.Success(200, messages));
        }
        [HttpGet("getmessages")]
        public async Task<IActionResult> GetMessages(Guid userId)
        {
            var messages = await _userservice.GetMessages(userId);
            return CreateAnActionResult(CustomResponseDTO<IEnumerable<Message>>.Success(200, messages));

        }
        [HttpGet("markasread")]
        public async Task<IActionResult> MarkedAsRead(Guid messageId)
        {
            var message = await _userservice.MarkedAsRead(messageId);
            return CreateAnActionResult(CustomResponseDTO<Message>.Success(200, message));

        }
        [HttpGet("getsentmessages")]
        public async Task<IActionResult> GetSentMessages(Guid userId)
        {
            var messages = await _userservice.GetSentMessages(userId);
            return CreateAnActionResult(CustomResponseDTO<IEnumerable<Message>>.Success(200, messages));

        }
        [HttpPost("AddTodoToUser")]
        public async Task<ActionResult> AddTodoToUser(Guid userId, [FromBody]string todoId)
        {
            var y = new Guid(todoId);
            var x = await _todoUserService.AddTodoToUser(userId,y);
            return Ok(x);
        }
        [HttpPost("removetodouser")]
        public async Task<ActionResult> RemoveTodoUser(Guid userId, [FromBody] string todoId) 
        {
            var y = new Guid(todoId);
            var x = await _todoUserService.RemoveUserFromTodoUser(userId, y);
            return Ok(x);
        }
        [HttpPut("update")]
        public async Task<IActionResult> UpdateUser([FromForm]CustomUserUpdateDTO userDTO, Guid userId )
        {
            var user = await _userservice.UpdateUser(userDTO, userId);
            return CreateAnActionResult(CustomResponseDTO<User>.Success(200, user));
        }
        [HttpGet("getnotifications")]
        public async Task<IActionResult> GetNotifications( Guid userId)
        {
            var notifications = await _userservice.GetNotifications(userId);
            if (notifications == null) {
                return CreateAnActionResult(CustomResponseDTO<IEnumerable<Notification>>.Success(200, null));
            }
            return CreateAnActionResult(CustomResponseDTO<IEnumerable<Notification>>.Success(200, notifications));
        }
        [HttpPut("getnotificationsmarkedread")]
        public async Task<IActionResult> GetNotificationsMarkedAsRead(Guid userId)
        {
            var notifications = await _userservice.GetNotificationsMarkedAsRead(userId);
            if (notifications == null)
            {
                return NotFound();
            }
            return Ok();
        }
        [HttpDelete("deletenotification")]
        public async Task<IActionResult> DeleteNotification(Guid notificationId)
        {
      
            await _userservice.DeleteNotification(notificationId);
                    
            return Ok();
        }
    }

}
