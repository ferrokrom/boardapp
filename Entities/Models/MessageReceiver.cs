using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    public class MessageReceiver
    {
        public Guid MessageId { get; set; }
        public virtual Message Message { get; set; }
        public Guid UserId { get; set; }
        public bool isRead {get; set; }
        public virtual User User { get; set; }
    }
}
