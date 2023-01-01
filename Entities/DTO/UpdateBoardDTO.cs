using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTO
{
    public class UpdateBoardDTO
    {
        public string? Title { get; set; }
        public bool? isDefault { get; set; }
        public string? Description { get; set; }
    }
}
