

using Entities.Abstract;

namespace Entities.Models
{
    public class Section : IEntity
    {
        public Guid Id { get; set; }
        public string Title { get; set; }=String.Empty;
        public string Description { get; set; }=String.Empty;
        public string Color { get; set; } = String.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime Duedate { get; set; }
        public virtual Board Board { get; set; }
        public ICollection<Todo>? Todos { get; set; }
    }
}
