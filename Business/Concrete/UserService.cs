using AutoMapper;
using Azure.Core;
using Business.Abstract;
using DataAccess.Abstract;
using DataAccess.Concrete;
using Entities.DTO;
using Entities.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class UserService : Service<User>, IUserService
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IBoardUserRepository _boardUserRepository;
        private readonly IBoardRepository _boardRepository;
        private readonly IMessageRepository _messageRepository;
        private readonly IMessageReceiverRepository _messageReceiverRepository;


        private readonly IUserNotificationRepository _userNotificationRepository;

        public UserService(
            IUserNotificationRepository userNotificationRepository,
            IUserRepository userRepository,
            IMessageRepository messageRepository,
                        IMessageReceiverRepository messageReceiverRepository,
            IBoardUserRepository boardUserRepository,
            IBoardRepository boardRepository,  IMapper mapper, IUnitOfWork unitOfWork) : base(userRepository, unitOfWork)
        {
            _mapper = mapper;
            _messageRepository = messageRepository;
            _messageReceiverRepository = messageReceiverRepository;
            _userNotificationRepository = userNotificationRepository;
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
            _boardRepository=boardRepository;
            _boardUserRepository=boardUserRepository;
        }
        public async Task<User> GetUserWithFields(Guid userId)
        {
            var x =_userRepository.Get(x => x.Id.Equals(userId)).Include(x => x.BoardUsers).FirstOrDefault();
            return x;
        }

        public async Task<User> Register(UserDTO userDto)
        {
            var userRequest = _mapper.Map<User>(userDto);
            CreatePasswordHash(userDto.Password, out byte[] passwordHash, out byte[] passwordSalt);
            var obj = Guid.NewGuid();
            userRequest.Id = obj;
            userRequest.CreatedDate = DateTime.UtcNow;
            userRequest.UpdatedDate = DateTime.UtcNow;
            userRequest.Email = "";
            userRequest.Firstname = "";
            userRequest.Lastname = "";
            userRequest.Avatar = "";
            userRequest.Role = "User";
            userRequest.PasswordHash = passwordHash;
            userRequest.PasswordSalt = passwordSalt;

            await _userRepository.Create(userRequest);  
            await _unitOfWork.CommitAsync();

            return userRequest;

        }
        public Task<bool> CheckIfUserExists(UserDTO userDto) 
        {
            var userExist = false;
            var userExists = _userRepository.Get(x => x.Username.Equals(userDto.Username));
            if (userExists.Any())
            {
                userExist = true;
            }
 
            return Task.FromResult(userExist);
        }
        public async Task<Tuple<string,LoginResponseDTO>> Login(UserDTO userDto)
        {
            var user = _userRepository.Get(x => x.Username.Equals(userDto.Username)); 

            if (!user.Any())
            {
                return new Tuple<string,LoginResponseDTO>("user not found",null);
            }

            var passwordHash= user.FirstOrDefault()?.PasswordHash;
            var passwordSalt= user.FirstOrDefault()?.PasswordSalt;
            var userId= user.FirstOrDefault()?.Id;

            

            if ( VerifyPasswordHash(userDto.Password, passwordHash, passwordSalt))
            {
                var mainUser= _userRepository.
                    Get(x => x.Username.Equals(userDto.Username)).
                    Include(s => s.BoardUsers).
                    ThenInclude(s => s.Board).
                    ThenInclude(s => s.BoardUsers).
                    ThenInclude(a => a.User).First();

                var mappedUser = _mapper.Map<LoginResponseDTO>(mainUser);

                var token = CreateToken(userDto);
                var responseTuple = new Tuple<string, LoginResponseDTO>(token, mappedUser);

                return responseTuple;
            }


            return new Tuple<string, LoginResponseDTO>("not found", null);
        }
         private string  CreateToken(UserDTO user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, "User")
            };
          
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("superSecretKey@345"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {

                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

        }
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }

        }
        public async Task<Board> AddNewBoardToUser(Guid userId, CreateBoardDTO boardDTO) 
        {
            Board newBoard = new Board();
            newBoard.IsDefault = boardDTO.isDefault;
            newBoard.Title = boardDTO.Title;
            newBoard.Description =boardDTO.Description;

           
            
            await _boardRepository.Create(newBoard);
            var user = _userRepository.Get(x => x.Id.Equals(userId)).Include(x => x.BoardUsers).FirstOrDefault();

            foreach(Guid uId in boardDTO.Users) 
            {
                BoardUser bu = new BoardUser();
             
                bu.Board = newBoard;
                bu.User = user;
                bu.Role = "User";
                await _boardUserRepository.Create(bu);
                user.BoardUsers.Add(bu);
                
            }
       
        
            _userRepository.Update(user);
            await _unitOfWork.CommitAsync();
            
            return newBoard;
        }

      
        public async Task<User> UpdateUser(CustomUserUpdateDTO userDTO, Guid userId)
        {
            var user = _userRepository.
                Get(x => x.Id.Equals(userId)).
                Include(s => s.BoardUsers)
            .First();

            if (userDTO.Avatar != null && userDTO.Avatar.Length > 0)
            {
                var folderName = Path.Combine("Resources", "Images");

                   var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                var filePath = Path.Combine(pathToSave, userDTO.Avatar.FileName);
                var dbPath = Path.Combine(folderName, userDTO.Avatar.FileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await userDTO.Avatar.CopyToAsync(stream);
                }
                user.Avatar = dbPath;

            }
            
            user.UpdatedDate = DateTime.Now;
            user.Firstname = userDTO.Firstname;
            user.Lastname = userDTO.Lastname;
            user.Email = userDTO.Email;

           

            _userRepository.Update(user);
            await _unitOfWork.CommitAsync();


            return user;
        }

        public async Task<IEnumerable<Notification>> GetNotifications(Guid userId)
        {
            var notifications = _userNotificationRepository.Get(x => x.UserId.Equals(userId)).Select(x => x.Notification).ToList();
            return notifications;
        }
        public async Task<IEnumerable<Notification>> GetNotificationsMarkedAsRead(Guid userId)
        {
            var notifications = _userNotificationRepository.Get(x => x.UserId.Equals(userId) && x.isRead == false).ToList();
            if (notifications.Count > 0) {
                foreach (var notification in notifications) {
                    notification.isRead = true;
                    _userNotificationRepository.Update(notification);

                }
            }
            await _unitOfWork.CommitAsync();
            var notificationsUpdated = _userNotificationRepository.Get(x => x.UserId.Equals(userId) && x.isRead == false).Select(x => x.Notification).ToList();

            return notificationsUpdated;
        }

        public async Task<Message> CreateMessage(Guid senderId, MessageBodyDTO messageBody)
        {
            var senderUser = _userRepository.Get(x => x.Id.Equals(senderId)).FirstOrDefault();

            List<User> receiverUsers = new List<User>();

            foreach (var user in messageBody.Receivers) 
            {
                
                receiverUsers.Add(_userRepository.Get(x => x.Id.Equals(user)).FirstOrDefault());
            }

            Message msg = new Message()
            {
                Body = messageBody.Body,
                Subject = messageBody.Subject,
                CreatedAt = DateTime.Now,
                IsRead = false,
                Sender = senderUser
                
            };
            await _messageRepository.Create(msg);

     
            foreach (var user in receiverUsers)
            {
                var x = new MessageReceiver() { 
                    User = user,
                    Message = msg
                };
                await _messageReceiverRepository.Create(x);
            }
            senderUser.SentMessages.Add(msg);
            _userRepository.Update(senderUser);

            await _unitOfWork.CommitAsync();
            return msg;
        }

        public async Task<IEnumerable<Message>> GetMessages(Guid userId)
        {
            var messages = _messageReceiverRepository.Get(x => x.UserId.Equals(userId)).Select(x=>x.Message).ToList();
            foreach (var message in messages) {
                message.Sender = _userRepository.Get(x => x.Id.Equals(message.SenderId)).First();
                message.Receivers= _messageReceiverRepository.Get(x => x.MessageId.Equals(message.Id) && x.UserId.Equals(userId)).ToList();
            }
            return messages;

        }
        public async Task<Message> MarkedAsRead(Guid messageId)
        {
            var message = _messageReceiverRepository.Get(x => x.MessageId.Equals(messageId)).First();
            
            message.isRead = true;
            _messageReceiverRepository.Update(message);
            await _unitOfWork.CommitAsync();


            var returnedMessage =_messageReceiverRepository.Get(x => x.MessageId.Equals(messageId)).Select(x=>x.Message).First();

            return returnedMessage;

        }
        public async Task<IEnumerable<Message>> GetSentMessages(Guid userId)
        {
            var messages = _messageRepository.Get(x => x.SenderId.Equals(userId)).Include(x => x.Receivers).ToList();
            foreach (var message in messages)
            {
                message.Sender = _userRepository.Get(x => x.Id.Equals(message.SenderId)).First();
            }
            return messages;

        }

        public async Task<UserNotification> DeleteNotification(Guid notificationId)
        {
            var notification = _userNotificationRepository.Get(x => x.NotificationId.Equals(notificationId)).First();

            _userNotificationRepository.Delete(notification);
            await _unitOfWork.CommitAsync();

            return notification;
        }
    }
}
