using DataAccess.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Abstract
{
    public interface IGenericRepository<T> 
    {
        IQueryable<T> Get(Expression<Func<T, bool>> filter);
        Task<T> GetById(Guid id);
        IEnumerable<T> GetAll();
        Task Create(T entity);
        Task CreateRange(List<T> entities);
        void Update(T entity);
        void Delete(T entity);
        void DeleteRange(List<T> entities);

    }
}
