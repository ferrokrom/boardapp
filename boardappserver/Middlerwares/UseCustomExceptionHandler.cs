using boardappserver.Controllers;
using Business.Exceptions;
using Entities.DTO;
using Entities.Models;
using Microsoft.AspNetCore.Diagnostics;
using Newtonsoft.Json;

namespace boardappserver.Middlerwares
{
    public static class UseCustomExceptionHandler
    {
        public static void UserCustomException(this IApplicationBuilder app) 
        {
            app.UseExceptionHandler(config =>
            {
                config.Run(async context =>
                {
                    context.Response.ContentType = "application/json";
                    var exceptionFeature = context.Features.Get<IExceptionHandlerFeature>();
                    var statusCode = exceptionFeature.Error switch
                    {
                        ClientSideException => 401,
                        _ => 500
                    };
                    context.Response.StatusCode = statusCode;
                    var response = CustomResponseDTO<NoContentDTO>.Fail(statusCode, exceptionFeature.Error.Message);
                    await context.Response.WriteAsync((new ErrorDetails
                    {
                        StatusCode = context.Response.StatusCode,
                        Message = exceptionFeature.Error.Message

                    }.ToString())) ;
                    
                }
                );
            });

        }
    }
}
