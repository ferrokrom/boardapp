using Core.Entities;

using Microsoft.EntityFrameworkCore;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using DbContext = System.Data.Entity.DbContext;
using EntityState = Microsoft.EntityFrameworkCore.EntityState;

namespace Core.DataAccess.EntityFramework
{
    public class EFEntityRepositoryBase<TEntity,TContext>:IEntityRepository<TEntity>
        where TEntity : class, IEntity,new()
        where TContext: DbContext, new()
    {
              
        public TEntity Get(Expression<Func<TEntity, bool>> filter)
        {


            using (TContext context = new TContext())

            {
                return context.Set<TEntity>().SingleOrDefault(filter);
            }
        }   
        public List<TEntity> GetAll(Expression<Func<TEntity, bool>> filter=null)
        {
                using (TContext context = new TContext())
                {                
                    return filter == null
                    ? context.Set<TEntity>().ToList()
                    : context.Set<TEntity>().Where(filter).ToList();  
                }
        }
        public void Create(TEntity ntity)
        {
            using (TContext context = new TContext())

            {
                var addedEntity = context.Entry(ntity);
            }
        }
        public void Update()
        {
            throw new NotImplementedException();
        }

        public void Delete(TEntity ntity)
        {
            using (TContext context = new TContext())

            {
                var deletedEntity = context.Entry(ntity);
                deletedEntity.State = (System.Data.Entity.EntityState)EntityState.Deleted;
                context.SaveChanges();

            }
        }

      

  
    }
}
