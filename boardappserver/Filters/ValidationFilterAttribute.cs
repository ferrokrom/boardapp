using boardappserver.Controllers;
using Entities.Abstract;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace boardappserver.Filters
{
    public class ValidationFilterAttribute<T> : IActionFilter
    {

        public void OnActionExecuting(ActionExecutingContext context)
        {
            var param = context.ActionArguments.Values.FirstOrDefault();
            if (param == null) 
            {
                context.Result = new NotFoundObjectResult(CustomResponseDTO<T>.Fail(404, "Object not found"));
                return;
            }
            if (!context.ModelState.IsValid) 
            {
                context.Result = new UnprocessableEntityObjectResult(context.ModelState);
            }
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
           
        }
    }
}
