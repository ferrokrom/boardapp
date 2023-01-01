using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    public class TodoUser
    {
        public Guid UserId { get; set; }
        public User User { get; set; }
        public Guid TodoId { get; set; }
        public Todo Todo { get; set; }
    }
}
