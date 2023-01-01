

using Entities.Abstract;

namespace Entities.Models
{
    public class Board:IEntity
    {
        public Guid Id { get; set; }
        public string? Title { get; set; }=String.Empty;
        public string? Description { get; set; }=String.Empty;
        public bool IsDefault { get; set; }
        public DateTime CreatedAt  { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime Duedate { get; set;  }
        public ICollection<BoardUser> BoardUsers { get; set; }
        public ICollection<Section>? Sections { get; set; }

    }
}
