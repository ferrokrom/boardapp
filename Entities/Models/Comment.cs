using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string? Subject { get; set; }
        public DateTime? CreatedDate { get; set; }
        public User? Sender { get; set; }
        public string? formFile { get; set; }
        public Todo? Todo { get; set; }
    }
}
