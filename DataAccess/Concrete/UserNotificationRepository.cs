using DataAccess.Abstract;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete
{
    public class UserNotificationRepository : GenericRepository<UserNotification>,IUserNotificationRepository
    {
        public UserNotificationRepository(AppilicationContext appilicationContext) : base(appilicationContext)
        {
        }
    }
}
