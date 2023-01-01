using AutoMapper;
using Business.Abstract;
using DataAccess.Abstract;
using DataAccess.Concrete;
using Entities.DTO;
using Entities.Models;
using Microsoft.EntityFrameworkCore;


namespace Business.Concrete
{
    
    public class BoardService :Service<Board>, IBoardService
    {

      
        private readonly IBoardRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IBoardUserRepository _boardUserRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public BoardService(IMapper mapper,IUserRepository userRepository,IBoardUserRepository boardUserRepository,IBoardRepository repository,IUnitOfWork unitOfWork): base(repository,unitOfWork)
        {
            _repository = repository;
            _mapper = mapper;
            _userRepository=userRepository;
            _unitOfWork = unitOfWork;
            _boardUserRepository = boardUserRepository;
        }
        public async Task<Board> InitialBoardAssign(User user)
        {
            var board = new Board();
            board.UpdatedAt = DateTime.Now;
            board.CreatedAt =DateTime.Now;
            board.Duedate = DateTime.Now;
            board.IsDefault = true;
           

            await _repository.Create(board);
            await _unitOfWork.CommitAsync();
            
            return board;
        }
        public async Task<IEnumerable<User>> GetBoardUsers(Guid boardId) 
        {
            var listOfBoardUsers = _boardUserRepository.Get(x => x.BoardId.Equals(boardId)).Include(s => s.User).Select(x=>x.User).ToList();
            return listOfBoardUsers;
        }
        public IEnumerable<Board> GetAll()
        {
            return _repository.GetAll();
        }

        public async Task<User> AddUserToBoard(Guid userId, Guid boardId)
        {
            try { 
                var bu = new BoardUser();
                bu.UserId = userId;
                bu.BoardId = boardId;
                bu.Role = "User";
                var user = _userRepository.Get(x => x.Id.Equals(userId)).First();

                var boardUser = _boardUserRepository.Create(bu);
                await _unitOfWork.CommitAsync();
                return user; 
            }
            catch (Exception ex) { 
                throw new Exception(ex.Message);
            }
        }

        public async Task<Board> DeleteBoard(Guid boardid)
        {
           
                var userBoard = _repository.Get(s => s.Id.Equals(boardid)).FirstOrDefault();
                if (userBoard == null)
                {
                    return null;
                }

                var board = _boardUserRepository.Get(x => x.BoardId.Equals(boardid))?.ToList();
                if (board == null) {
                    return null;
                }
                
                foreach (BoardUser boardUser in board)
                {
                    _boardUserRepository.Delete(boardUser);
                }
                _repository.Delete(userBoard);
                await _unitOfWork.CommitAsync();
                return userBoard;

            
 
        }

        public async Task<User> RemoveUserFromBoard(Guid userId, Guid boardId)
        {
            var user = _userRepository.Get(x => x.Id.Equals(userId)).First();
            var boardUser = _boardUserRepository.Get(x => x.BoardId.Equals(boardId) && x.UserId.Equals(userId)).First();
            Console.WriteLine(boardUser);
            _boardUserRepository.Delete(boardUser);
            await _unitOfWork.CommitAsync();
            return user;


        }

        public async Task<Board> UpdateBoard(Guid boardId, UpdateBoardDTO board)
        {

            var toBeUpdatedBoard = _repository.Get(s => s.Id.Equals(boardId)).First();

            if (toBeUpdatedBoard == null)
            {
                throw new Exception("Board Not found");
            }
            toBeUpdatedBoard.Title = board.Title;
            toBeUpdatedBoard.IsDefault = (bool)board.isDefault;
            toBeUpdatedBoard.Description = board.Description;
            toBeUpdatedBoard.UpdatedAt = DateTime.Now;


            _repository.Update(toBeUpdatedBoard);
            await _unitOfWork.CommitAsync();
           
            return toBeUpdatedBoard;

        }

        public async Task<Board> CreateBoard(Guid userId, CreateBoardDTO board)
        {
            Board newBoard = new Board() {
                IsDefault = board.isDefault,
                Title = board.Title,
                Description = board.Description,
                Duedate = board.DueDate,
                CreatedAt = DateTime.Now,
            };
            await _repository.Create(newBoard);
            var user = _userRepository.Get(x => x.Id.Equals(userId)).Include(x => x.BoardUsers).FirstOrDefault();
            BoardUser buser = new BoardUser()
            {
                User = user,
                Board = newBoard,
                Role = "Admin"
            };
            await _boardUserRepository.Create(buser);


            if (user == null) {
                throw new DriveNotFoundException();
            }

            foreach (Guid uId in board.Users)
            {
                BoardUser bu = new BoardUser() { 

                Board = newBoard,
                User = user,
                Role = "User"
                };           
                await _boardUserRepository.Create(bu);

            }
            _userRepository.Update(user);
            await _unitOfWork.CommitAsync();

            return newBoard;
        }

        public async Task<Board> GetBoard(Guid boardId)
        {
            var board = _repository.Get(s => s.Id.Equals(boardId)).First();
            if (board == null) {
                return null;
            }
            return board;
         }

        public IEnumerable<Board> GetBoardByUserId(Guid userId)
        {
            var boardUsers = _boardUserRepository.Get(s => s.UserId.Equals(userId)).Include(x=>x.Board);

            List<Board> boards = new List<Board>();

            if (boardUsers.Any())
            {
                foreach (var item in boardUsers)
                {
                  
                        boards.Add(item.Board);
                    
                }
            }

            return boards;
        }
    }
 }
