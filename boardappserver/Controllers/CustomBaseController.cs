using Microsoft.AspNetCore.Mvc;

namespace boardappserver.Controllers
{   

    public class CustomeBaseController : ControllerBase
    {
        [NonAction]
        public IActionResult CreateAnActionResult<T>(CustomResponseDTO<T> customResponseDTO)
        {

            if (customResponseDTO.StatusCode == 204)
                return new ObjectResult(null)
                {
                    StatusCode = Response.StatusCode
                };

            return new ObjectResult(customResponseDTO)
            {
                StatusCode = customResponseDTO.StatusCode
            };
        }

  
    }
}
