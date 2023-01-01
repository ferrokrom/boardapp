

using Entities.Abstract;

namespace Entities.Models
{
    public class Todo : IEntity
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = String.Empty;   
        public string Description { get; set; } = String.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime Duedate { get; set; }
        public bool IsCompleted { get; set; }
        public Section Section { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<TodoUser> TodoUsers { get; set; }
        public string Priority { get; set; } = String.Empty;
    }
}
