using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    public class Message
    {
        public Guid Id { get; set; }
        public string Subject { get; set; }
        public DateTime CreatedAt { get; set; }
        public virtual User? Sender { get; set; }
        public virtual ICollection<MessageReceiver> Receivers { get; set; }

        public Guid? ReceiverId { get; set; }

        public Guid? SenderId { get; set; }

        public string Body { get; set; }
        public bool IsRead { get; set; }
        public string FromFile { get; set; } = string.Empty;

    }
}
