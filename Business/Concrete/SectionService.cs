using AutoMapper;
using Business.Abstract;
using DataAccess.Abstract;
using DataAccess.Concrete;
using Entities.DTO;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;


namespace Business.Concrete
{
    public class SectionService : Service<Section>, ISectionService
    {
        protected readonly ISectionRepository _sectionRepository;
        protected readonly IMapper _mapper;
        protected readonly ITodoService _todoService;
        protected readonly ITodoRepository _todoRepository;
        protected readonly IBoardRepository _boardRepository;
        protected readonly IUnitOfWork _unitOfWork;
        public SectionService(ITodoService todoService,
        ITodoRepository todoRepository,IBoardRepository boardRepository, IGenericRepository<Section> repository, IMapper mapper,IUnitOfWork unitOfWork, ISectionRepository sectionRepository) : base(repository, unitOfWork)
        {
            _sectionRepository = sectionRepository;
            _mapper = mapper;
            _boardRepository = boardRepository;
            _unitOfWork = unitOfWork;
            _todoRepository = todoRepository;
            _todoService = todoService;
        }
        public async Task<Section> NewSection(Guid boardId) 
        {
            var section = new Section();
            section.Id = Guid.NewGuid();
            section.Title = "New Section";
            section.CreatedAt = DateTime.Now;
            section.Color = "rgb(2, 62, 138)";

            var board = _boardRepository.Get(x => x.Id.Equals(boardId)).Include(y => y.Sections).FirstOrDefault();

            if (board != null) 
            {
                board.Sections.Add(section);
            }
            await _sectionRepository.Create(section);
            await _unitOfWork.CommitAsync();
 
            return section;
        }
        public async Task<IEnumerable<Section>> GetSectionsByBoardId(Guid boardId)
        {
            var mysections = _sectionRepository.Get(x => x.Board.Id.Equals(boardId)).Include(y => y.Todos).OrderBy(s=>s.CreatedAt);
            return mysections;

        }
        public async Task<Section> GetSections(Guid sectionId)
        {
            var sections = _sectionRepository.Get(x => x.Id.Equals(sectionId)).Include(y => y.Todos).FirstOrDefault();
            return sections;

        }

        public async Task<Section> GetSectionWithTodos(Guid sectionId)
        {
            var section = _sectionRepository.Get(x => x.Id.Equals(sectionId)).Include(i=>i.Todos).FirstOrDefault();

            return section;
        }

        public async Task<Section> UpdateSection(Guid sectionId, SectionUpdateDTO stDTO)
        {
            var section = _sectionRepository.Get(x => x.Id.Equals(sectionId)).FirstOrDefault();

            _mapper.Map(stDTO, section);

            section.UpdatedAt = DateTime.Now;

            _sectionRepository.Update(section);

            await _unitOfWork.CommitAsync();

            return section;
        }

        public async Task<Section> DeleteSection(Guid sectionId)
        {

            var section = _sectionRepository.Get(x => x.Id.Equals(sectionId)).Include(i => i.Todos).ThenInclude(s=>s.TodoUsers).FirstOrDefault();
            var x = section.Todos.ToList();

            foreach (var a in x)
            {
                await _todoService.DeleteTodo(a.Id);
            }

            _sectionRepository.Delete(section);
            await _unitOfWork.CommitAsync();
            return section;
        }
    }
}
