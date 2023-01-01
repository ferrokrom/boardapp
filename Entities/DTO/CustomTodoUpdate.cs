using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTO
{
    public class CustomTodoUpdate
    {
        public Guid Id { get; set; }
        public string? Title { get; set; }
        public DateTime DueDate { get; set; }
        public string Description { get; set; } = String.Empty;
        public string? Priority { get; set; }
        public bool IsCompleted { get; set; }

    }
}
