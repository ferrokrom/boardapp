using DataAccess.Abstract;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete
{
    public class MessageReceiverRepository : GenericRepository<MessageReceiver>, IMessageReceiverRepository
    {
        public MessageReceiverRepository(AppilicationContext appilicationContext) : base(appilicationContext)
        {
        }
    }
}
