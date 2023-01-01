using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTO
{
    public class MessageBodyDTO
    {
        public string Body { get; set; }
        public string Subject { get; set; }
        public List<Guid> Receivers { get; set; }
    }
}
