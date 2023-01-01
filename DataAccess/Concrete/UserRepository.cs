
using DataAccess.Abstract;
using Entities.Models;

namespace DataAccess.Concrete
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        private readonly AppilicationContext _context;
        public UserRepository(AppilicationContext appilicationContext) : base(appilicationContext)
        {
            _context = appilicationContext;
        }


    }
}
