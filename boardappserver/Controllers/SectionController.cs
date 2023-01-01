using AutoMapper;
using Business.Abstract;
using Entities.DTO;
using Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace boardappserver.Controllers
{
    [Route("")]
    [ApiController]
    public class SectionController : CustomeBaseController
    {
        protected readonly IMapper _mapper;
        protected readonly ISectionService _sectionService;

        public SectionController(IMapper mapper, ISectionService sectionService)
        {
            _mapper = mapper;
            _sectionService = sectionService;
        }
        [HttpPost("create")]
        public async Task<IActionResult> NewSection(Guid boardId) 
        {
           
            var newsection= await _sectionService.NewSection(boardId);

            return CreateAnActionResult(CustomResponseDTO<Section>.Success(200,newsection));
       
        }
        [HttpGet("get")]
        public async Task<IActionResult> GetSectionByBoard(Guid boardId)
        {
            var sections= await _sectionService.GetSectionsByBoardId(boardId);
            return CreateAnActionResult(CustomResponseDTO<IEnumerable<Section>>.Success(200, sections));

        }
        [HttpGet("getsectionwithtodos")]
        public async Task<ActionResult<IEnumerable<Section>>> GetSectionWithTodos(Guid sectionId)
        {
            var sections = await _sectionService.GetSectionWithTodos(sectionId);
            return Ok(sections);
        }
        [HttpPut("update")]
        public async Task<IActionResult> UpdateSection(Guid sectionId, [FromBody]SectionUpdateDTO suptadeDTO)
        {

            var section = await _sectionService.UpdateSection(sectionId, suptadeDTO);

            return CreateAnActionResult(CustomResponseDTO<Section>.Success(200, section));
        }
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteSection(Guid sectionId)
        {

            var section = await _sectionService.DeleteSection(sectionId);

            return CreateAnActionResult(CustomResponseDTO<Section>.Success(200, section));
        }
    }
}
