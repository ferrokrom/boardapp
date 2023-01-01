using Entities.Models;
using Microsoft.AspNetCore.Diagnostics;
using System.Net;

namespace boardappserver.CustomExtensionMiddleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }
        public async Task InvokeAsync(HttpContext httpContext) 
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex) 
            {
                await HandleExceptionAsync(httpContext);
            }
        }
        private  Task HandleExceptionAsync(HttpContext context) 
        {
            context.Response.ContentType = "application/json";
            
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            return context.Response.WriteAsync(new ErrorDetails
            {
                StatusCode = context.Response.StatusCode,
                Message = "dsad"

            }.ToString()) ;
        }
    }
}
