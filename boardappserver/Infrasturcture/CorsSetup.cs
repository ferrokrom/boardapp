using Business.Concrete;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace boardappserver.Infrastructure


{
    public static class CorsSetup
    {
        public static IServiceCollection AddCorsPolicy(this IServiceCollection Services)
        {

            Services.AddCors(options =>
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

            return Services;
        }
    }
}
