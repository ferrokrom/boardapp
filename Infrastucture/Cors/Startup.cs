using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace Infrastucture.Cors
{
     internal static class Startup
    {
        private const string CorsPolicy = nameof(CorsPolicy);



        internal static IServiceCollection AddCorsPolicy(IApplicationBuilder app, IConfiguration config) 
        {

            return services.AddCors(options =>
            {
                options.AddPolicy(name: "boardappclient",

                                    policy =>
                                    {
                                        policy.WithOrigins("http://localhost:3000");
                                        policy.AllowAnyHeader();
                                        policy.AllowAnyMethod();
                                        policy.AllowCredentials();
                                    });
            });

        }
        internal static IApplicationBuilder UseCorsPolicy(this IApplicationBuilder app) =>
                app.UseCors(CorsPolicy);
    }
}
