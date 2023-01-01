using Business.Abstract;
using DataAccess.Abstract;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class UserDTOService:IUserDTOService
    {
       
            IUserDTODal _userDal;

            public UserDTOService(IUserDTODal userDal)
            {
                _userDal = userDal;
            }



            public void Create(UserDTO user)
            {
                _userDal.Create(user);
            }

        public List<UserDTO> GetAll()
        {
            throw new NotImplementedException();
        }
    }
    
}
