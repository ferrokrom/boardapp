namespace DataAccess.Concrete
{
    public interface IUnitOfWork
    {
        void Commit();
        Task CommitAsync();
    }
}