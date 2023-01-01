using DataAccess.Abstract;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete
{
    public class TodoUserRepository : GenericRepository<TodoUser>, ITodoUserRepository
    {
  

        public TodoUserRepository(AppilicationContext appilicationContext) : base(appilicationContext)
        {
        }
    }
}
