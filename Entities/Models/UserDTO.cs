

using Entities.Abstract;

namespace Entities.Models
{
    public class UserDTO : IEntity
    {
        public Guid Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;

    }
}
