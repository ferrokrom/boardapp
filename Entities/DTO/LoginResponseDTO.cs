

using Entities.Models;

namespace Entities.DTO
{
    public class LoginResponseDTO
    {



        public Guid Id { get; set; }
        public string? Firstname { get; set; } = String.Empty;
        public string? Lastname { get; set; } = String.Empty;
        public string? Username { get; set; } = string.Empty;
        public string Avatar { get; set; } = string.Empty;
        public string? Email { get; set; } = String.Empty;
        public string Role { get; set; }
        public ICollection<TodoUser>? TodoUsers { get; set; }
        public ICollection<BoardUser>? BoardUsers { get; set; }



    }
}
