
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastucture.Cors
{
     internal static class Appdef
    {
        private const string CorsPolicy = nameof(CorsPolicy);



        internal static IServiceCollection AddCorsPolicy(IServiceCollection service, IConfiguration config) 
        {
            return service.AddCors(options =>
            {
                options.AddPolicy(name: "boardappclient",

                                    policy =>
                                    {
                                        policy.WithOrigins("*");
                                        policy.AllowAnyHeader();
                                        policy.AllowAnyMethod();
                                        policy.AllowCredentials();
                                    });
                
            });

        }
        internal static IApplicationBuilder UseCorsPolicy(this IApplicationBuilder app) =>
                app.UseCors("boardappclient");
    }
}
