using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    public class BoardUser
    {
        public Guid UserId { get; set; }
        public User User { get; set; }
        public string Role { get; set; }
        public Guid BoardId { get; set; }
        public Board Board { get; set; }

    }
}
