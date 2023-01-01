using boardappserver.CustomExtensionMiddleware;
using Entities.Models;
using Microsoft.AspNetCore.Diagnostics;
using System.Net;
using System.Runtime.CompilerServices;

namespace boardappserver.Extensions
{
    public static class ExceptionMiddlewareExtensions
    {

        public static void ConfigureCustomExceptionMiddleware(this IApplicationBuilder app) 
        {
            app.UseMiddleware<ExceptionMiddleware>();
        }
    }
}
