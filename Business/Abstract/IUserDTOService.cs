using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
  
        public interface IUserDTOService

        {
            List<UserDTO> GetAll();
            void Create(UserDTO user);
        }
    }


