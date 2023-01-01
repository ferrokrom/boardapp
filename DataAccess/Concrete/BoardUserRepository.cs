using DataAccess.Abstract;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete
{
    public class BoardUserRepository : GenericRepository<BoardUser>,IBoardUserRepository
    {
        public BoardUserRepository(AppilicationContext appilicationContext) : base(appilicationContext)
        {
        }
    }
}
