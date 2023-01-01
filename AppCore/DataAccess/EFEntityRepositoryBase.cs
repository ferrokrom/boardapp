using AppCore.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;


namespace AppCore.DataAccess
{
    public class EFEntityRepositoryBase<TEntity> : IEntityRepository<TEntity>
        where TEntity : class, IEntity, new()
  
    {
        private readonly AppilicationContext _appContext;

        public EFEntityRepositoryBase(AppilicationContext appilicationContext)
        {
            _appContext = appilicationContext;
        }

        public TEntity Get(Expression<Func<TEntity, bool>> filter)
        {


            using (TContext context = new TContext())

            {
                return context.Set<TEntity>().SingleOrDefault(filter);
            }
        }
        public List<TEntity> GetAll(Expression<Func<TEntity, bool>> filter = null)
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
                addedEntity.State = EntityState.Added;
                context.SaveChanges();

            }
        }
        public void Update(Guid Id, TEntity entity)
        {
            using (TContext context = new TContext())
            {
                var addedEntity = context.Entry(entity);
                addedEntity.State = EntityState.Added;
                context.SaveChanges();

            }
        }

        public void Delete(TEntity ntity)
        {
            using (TContext context = new TContext())

            {
                var deletedEntity = context.Entry(ntity);
                deletedEntity.State = EntityState.Deleted;
                context.SaveChanges();

            }
        }


    }
}
