using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    public class UserNotification
    {
        public Guid UserId { get; set; }
        public User User { get; set; }
        public Guid NotificationId { get; set; }
        public Notification Notification { get; set; }
        public bool isRead { get; set; }
    }
}
