using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace boardappserver.Filters
{
    public class InternalErrorExceptionFilter : IExceptionFilter
       
    {
        private readonly ILogger _logger;

        public InternalErrorExceptionFilter(ILogger logger) {
        
            _logger = logger;
        }
        public void OnException(ExceptionContext context)
        {
            // Log the exception
            _logger.LogError(context.Exception, "Error occurred in controller action");

            // Set the response status code and message
            context.HttpContext.Response.StatusCode = 500;
            context.Result = new JsonResult("An error occurred while processing the request.");
        }
    }
}
