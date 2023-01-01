using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    public class Notification
    {
        public Guid Id { get; set; }
        public ICollection<UserNotification>? UserNotifications { get; set; }
        public string Message { get; set; }=string.Empty;
        public string Type { get; set; }=string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
