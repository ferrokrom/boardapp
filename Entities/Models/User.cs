using Entities.Abstract;
using Microsoft.AspNetCore.Http;

namespace Entities.Models
{
    public class User : IEntity
    {
        public Guid Id { get; set; }
        public string? Firstname { get; set; }= String.Empty;
        public string? Lastname { get; set; }=String.Empty;
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string? Username { get; set; }=string.Empty;
        public string? Avatar { get; set; }
        public byte[]? PasswordHash { get; set; } 
        public byte[]? PasswordSalt { get; set; }
        public string? Email { get; set; }  = String.Empty;
        public string? Role { get; set; }
        public ICollection<Comment>? Comments { get; set; }
        public  ICollection<Message>? SentMessages { get; set; }
        public  ICollection<MessageReceiver>? ReceivedMessages { get; set; }
        public ICollection<UserNotification>? UserNotifications { get; set; }
        public ICollection<TodoUser>? TodoUsers { get; set; }
        public ICollection<BoardUser>? BoardUsers { get; set; }
       
        



    }
}
