using Business.Abstract;
using DataAccess.Abstract;
using DataAccess.Concrete;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class Service<T> : IService<T> where T : class
    {
        private readonly IGenericRepository<T> _repository;
        private readonly IUnitOfWork _unitOfWork;

        public Service(IGenericRepository<T> repository, IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        public async Task<T> Create(T entity)
        {
            await _repository.Create(entity);
            await _unitOfWork.CommitAsync();
            return entity;
        }

        public Task CreateRange(List<T> entities)
        {
            throw new NotImplementedException();
        }

        public void Delete(T entity)
        {
            throw new NotImplementedException();
        }

        public void DeleteRange(List<T> entities)
        {
            throw new NotImplementedException();
        }

        public IQueryable<T> Get(Expression<Func<T, bool>> filter)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<T>> GetAll()
        {
           var x = _repository.GetAll();
            return x;
        }

        public async Task<T> GetById(Guid id)
        {
            var x = await _repository.GetById(id);
            return x;
        }

        public void Update(T entity)
        {
            throw new NotImplementedException();
        }
    }
}
