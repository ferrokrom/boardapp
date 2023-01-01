using Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Concrete
{
    public class AppilicationContext : DbContext
    {
    
        public AppilicationContext(DbContextOptions<AppilicationContext> options) : base(options)
        {
            
    }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(@"Server = (localdb)\ProjectModels; Database =boardapp");
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<TodoUser>().HasKey(tu => new { tu.UserId, tu.TodoId });

            modelBuilder.Entity<TodoUser>()
                .HasOne<User>(sc => sc.User)
                .WithMany(s => s.TodoUsers)
                .HasForeignKey(sc => sc.UserId)
                 .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<TodoUser>()
                .HasOne<Todo>(sc => sc.Todo)
                .WithMany(s => s.TodoUsers)
                .HasForeignKey(sc => sc.TodoId)
                 .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<BoardUser>().HasKey(tu => new { tu.UserId, tu.BoardId });

            modelBuilder.Entity<BoardUser>()
                .HasOne<User>(sc => sc.User)
                .WithMany(s => s.BoardUsers)
                .HasForeignKey(sc => sc.UserId)
                 .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<BoardUser>()
                .HasOne<Board>(sc => sc.Board)
                .WithMany(s => s.BoardUsers)
                .HasForeignKey(sc => sc.BoardId)
                 .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserNotification>().HasKey(tu => new { tu.UserId, tu.NotificationId });

            modelBuilder.Entity<UserNotification>()
                .HasOne<User>(sc => sc.User)
                .WithMany(s => s.UserNotifications)
                .HasForeignKey(sc => sc.UserId)
                 .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<UserNotification>()
                .HasOne<Notification>(sc => sc.Notification)
                .WithMany(s => s.UserNotifications)
                .HasForeignKey(sc => sc.NotificationId)
                .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<MessageReceiver>()
               .HasKey(mr => new { mr.MessageId, mr.UserId });
            modelBuilder.Entity<MessageReceiver>()
                .HasOne(mr => mr.Message)
                .WithMany(m => m.Receivers)
                .HasForeignKey(mr => mr.MessageId);
            modelBuilder.Entity<MessageReceiver>()
                .HasOne(mr => mr.User)
                .WithMany()
                .HasForeignKey(mr => mr.UserId);


        }

        public DbSet<User> Users { get; set; }
        public DbSet<Board> Boards { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<Todo> Todos { get; set; }
        public DbSet<UserDTO> UserDTOs { get; set; }
        public DbSet<TodoUser> TodoUsers { get; set; }
        public DbSet<BoardUser> BoardUsers { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<UserNotification> UserNotifications { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<MessageReceiver> MessageReceivers { get; set; }







    }
}
