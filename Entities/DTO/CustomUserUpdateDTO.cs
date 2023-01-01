using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTO
{
    public class CustomUserUpdateDTO
    {
        public string? Firstname { get; set; } = String.Empty;
        public string? Lastname { get; set; } = String.Empty;
        public string? Username { get; set; } = string.Empty;
        public IFormFile? Avatar { get; set; } 
        public string? Password { get; set; } = string.Empty;
        public string? Email { get; set; } = String.Empty;
    }
}
