
using DataAccess.Concrete;
using DataAccess.Abstract;
using Entities.Abstract;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;


namespace DataAccess.Concrete
{
    public class GenericRepository<TEntity> :IGenericRepository<TEntity>
        where TEntity : class, new()
  
    {
        private readonly AppilicationContext _appContext;
        private readonly DbSet<TEntity> dbSet;

        public GenericRepository(AppilicationContext appilicationContext)
        {
            _appContext = appilicationContext;
            dbSet = _appContext.Set<TEntity>();
        }
        public IQueryable<TEntity> Get(Expression<Func<TEntity, bool>> filter)
        {
            
            var x = dbSet.Where(filter);
            return x; 
          
           
        }
    
        public IEnumerable<TEntity> GetAll()
        {
            return dbSet.ToList();
        }
        public async Task Create(TEntity entity)
        {
            await dbSet.AddAsync(entity);
        }
        public async Task CreateRange(List<TEntity> entities) 
        {
            await dbSet.AddRangeAsync(entities);
        }
        public void Update(TEntity entity)
        {
            dbSet.Update(entity);
        }
        public void Delete(TEntity entity)
        {
            dbSet.Remove(entity);
        }
        public void DeleteRange(List<TEntity> entities) 
        {
            dbSet.RemoveRange(entities);
        }
        public async Task<TEntity> GetById(Guid id)
        {
            return await dbSet.FindAsync(id);
        }
    }
}
