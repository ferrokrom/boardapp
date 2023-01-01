

using boardappserver.Filters;
using Business.Abstract;
using Entities.DTO;
using Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System.Dynamic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace boardappserver.Controllers
{
    [Route("")]
    [ApiController]
    public class AuthController :CustomeBaseController
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthController> _logger;
        private readonly IUserService _userService;
        private readonly IBoardService _boardService;

        public AuthController(IConfiguration configuration, ILogger<AuthController> logger, IUserService userService,IBoardService boardService)
        {
            _configuration = configuration;
            _logger = logger;
            _userService = userService;
            _boardService = boardService;
        }

        [HttpPost("register")]
        [ServiceFilter(typeof(ValidationFilterAttribute<UserDTO>))]
        public async Task<IActionResult> Register(UserDTO request)
        {
            if (await _userService.CheckIfUserExists(request))
            {
                return BadRequest("Username Exists");
            }

            var user = await _userService.Register(request);

            return CreateAnActionResult(CustomResponseDTO<User>.Success(200, user));
        }

        [HttpPost("login")]
        [ServiceFilter(typeof(ValidationFilterAttribute<UserDTO>))]
        public async Task<IActionResult> Login(UserDTO requestLogin)
        {
            var x = await _userService.Login(requestLogin);
            var token = x.Item1;
            var user = x.Item2;

            if (user == null) 
            {
                return CreateAnActionResult(CustomResponseDTO<LoginResponseDTO>.Fail(404, "User Not Found"));
            }

            return CreateAnActionResult(CustomResponseDTO<LoginResponseDTO>.Success(200, user, token));
        }




    }
}
