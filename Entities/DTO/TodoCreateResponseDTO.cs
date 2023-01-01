using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTO
{
    public class TodoCreateResponseDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime Duedate { get; set; }
        public bool IsCompleted { get; set; }
        public Guid SectionId { get; set; }
        public ICollection<TodoUser> TodoUsers { get; set; }

        public string Priority { get; set; } = String.Empty;
    }
}
