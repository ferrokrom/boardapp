using Entities.DTO;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IService<T>
    {
        IQueryable<T> Get(Expression<Func<T, bool>> filter);
        Task<T> GetById(Guid id);
        Task <IEnumerable<T>> GetAll();
        Task<T> Create(T entity);
        Task CreateRange(List<T> entities);
        void Update(T entity);
        void Delete(T entity);
        void DeleteRange(List<T> entities);
    }
}
