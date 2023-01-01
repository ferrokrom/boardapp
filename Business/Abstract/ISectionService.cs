using Entities.DTO;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface ISectionService:IService<Section>
    {
        Task<Section> NewSection(Guid boardId);
        Task<IEnumerable<Section>> GetSectionsByBoardId(Guid boardid);
        Task<Section> GetSectionWithTodos(Guid sectionId);
        Task<Section> UpdateSection(Guid sectionId, SectionUpdateDTO sDTO);
        Task<Section> DeleteSection(Guid sectionId);

    }
}
