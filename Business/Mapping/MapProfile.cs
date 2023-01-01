using AutoMapper;
using Entities.DTO;
using Entities.Models;

namespace Business.Mapping
{
    public class MapProfile : Profile
    {
        public MapProfile()
        {
            CreateMap<UserDTO, User>().ReverseMap();
            CreateMap<SectionDTO, Section>().ReverseMap();
            CreateMap<TodoCreateResponseDTO, Todo>().ReverseMap();
            CreateMap<SectionUpdateDTO, Section>().ReverseMap();
            CreateMap<CreateBoardDTO, Board>().ReverseMap();
            CreateMap<LoginResponseDTO, User>().ReverseMap();
        }
    }
}
