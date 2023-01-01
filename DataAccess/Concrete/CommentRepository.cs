using DataAccess.Abstract;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete
{
    public class CommentRepository:  GenericRepository<Comment>, ICommentRepository
    {
        public CommentRepository(AppilicationContext appilicationContext) : base(appilicationContext)
    {
    }
    
    }
}
