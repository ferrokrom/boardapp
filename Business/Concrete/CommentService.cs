using AutoMapper;
using Business.Abstract;
using DataAccess.Abstract;
using DataAccess.Concrete;
using Entities.DTO;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class CommentService : Service<Comment>, ICommentService
    {
        private readonly IMapper _mapper;
        private readonly ICommentRepository _commentRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserRepository _userRepository;
        private readonly ITodoRepository _todoRepository;
        private readonly ITodoUserRepository _todoUserRepository;
        private readonly INotificationRepository _notificationRepository;
        private readonly IUserNotificationRepository _userNotificationRepository;




        public CommentService(IGenericRepository<Comment> repository,
                            ICommentRepository trepository,
                            IMapper mapper,
                            IUserNotificationRepository userNotificationRepository,
                            INotificationRepository notificationRepository,
                            ITodoUserRepository todoUserRepository,
                            ITodoRepository todoRepository,
                            IUserRepository userRepository,
                            IUnitOfWork unitOfWork) : base(repository, unitOfWork)
        {
            _mapper = mapper;
            _userNotificationRepository = userNotificationRepository;
            _notificationRepository = notificationRepository;
            _todoRepository = todoRepository;
            _commentRepository = trepository;
            _unitOfWork = unitOfWork;
            _userRepository = userRepository;
            _todoUserRepository = todoUserRepository;
        }

        public async Task<Comment> NewComment(CommentDTO commentDTO, Guid todoId,Guid userId)
        {
            Comment comment = new Comment();

            comment.Subject = commentDTO.Subject;
            comment.formFile = commentDTO.formFile;

            comment.CreatedDate = DateTime.Now;

            var user = _userRepository.Get(s => s.Id.Equals(userId)).Include(t => t.Comments).FirstOrDefault();
            if (user != null)
            {
                user.Comments.Add(comment);
            }
            comment.Sender = user;
            var todo = _todoRepository.Get(s => s.Id.Equals(todoId)).Include(t => t.Comments).FirstOrDefault();
            if (todo != null)
            {
                todo.Comments.Add(comment);
            }
            var msg = "New Comment Created By " +user.Username ;
            Notification notification = new Notification()
            { 
              Message = msg,
              Type="newcomment",
              CreatedAt= DateTime.Now,
              UpdatedAt= DateTime.Now,
            };
            await _notificationRepository.Create(notification);


            var otherUsers = _todoUserRepository.Get(x => x.UserId != userId && x.TodoId == todoId).Select(x=>x.User).ToList();

            if (otherUsers.Any()) {
                foreach (var otheruser in otherUsers) {

                    UserNotification userNotification = new UserNotification()
                    {
                        User = otheruser,
                        Notification = notification,
                        isRead =false

                    };
                    await _userNotificationRepository.Create(userNotification);
                }
            }

            comment.Todo = todo;

            await _commentRepository.Create(comment);
            await _unitOfWork.CommitAsync();

            return comment;
        }
 
        public async Task<Comment> DeleteComment(Guid commentId)
        {
            try
            {
                var comment = _commentRepository.Get(x => x.Id.Equals(commentId)).FirstOrDefault();
                if (comment == null)
                {
                    throw new Exception("Comment not found");
                }
  
                _commentRepository.Delete(comment);
                await _unitOfWork.CommitAsync();

                return comment;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<Comment> UpdateComment(Guid commentId, [FromBody] CustomCommentUpdate tBody)
        {
            try
            {
                var comment = _commentRepository.Get(t => t.Id.Equals(commentId)).FirstOrDefault();
                if (comment == null)
                {
                    throw new Exception("Comment not found");
                }

                var updatedComment = _mapper.Map(tBody, comment);

                _commentRepository.Update(updatedComment);
                await _unitOfWork.CommitAsync();

                return updatedComment;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<Comment> GetCommentsById(Guid commentId)
        {
            try
            {
                var comment = _commentRepository.Get(x => x.Id.Equals(commentId))
                    .Include(t => t.Sender)
                    .FirstOrDefault();
                if (comment == null)
                {
                    throw new Exception("Comment not found");
                }
                return comment;
            }
            catch (Exception ex)
            {
                // Log the exception and return null
                return null;
            }
        }

        public async Task<IEnumerable<Comment>> GetCommentsByTodoId(Guid todoId)
        {
            try
            {
                var comments = _commentRepository.Get(x => x.Todo.Id.Equals(todoId)).Include(x => x.Sender);

                return comments;
            }
            catch (Exception ex)
            {
                // Log the exception and return null
                return null;
            }

        }
        public async Task<IEnumerable<Comment>> GetCommentsByUserId(Guid userId)
        {
            try
            {
                var comments = _commentRepository.Get(x => x.Sender.Id.Equals(userId)).ToList();

                return comments;
            }
            catch (Exception ex)
            {
                // Log the exception and return null
                return null;
            }

        }
    }
}
