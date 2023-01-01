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
    public interface IUserService : IService<User>

    {
        Task<User> Register(UserDTO userDto);
        Task<Tuple<string,LoginResponseDTO>> Login(UserDTO userDto);
        Task<bool> CheckIfUserExists(UserDTO userDto);
        Task<User> GetUserWithFields(Guid id);
        Task<Board> AddNewBoardToUser(Guid userId,CreateBoardDTO boardCrateDTO);
        Task<User> UpdateUser(CustomUserUpdateDTO userDTO, Guid userId);
        Task<IEnumerable<Notification>> GetNotifications(Guid userId);
        Task<Message> CreateMessage(Guid senderId, MessageBodyDTO messageBody);
        Task<IEnumerable<Message>> GetMessages(Guid userId);
        Task<IEnumerable<Message>> GetSentMessages(Guid userId);
        Task<Message> MarkedAsRead(Guid messageId);
        Task<IEnumerable<Notification>> GetNotificationsMarkedAsRead(Guid userId);
        Task<UserNotification> DeleteNotification(Guid notificationId);

    }
}
