using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace boardappserver.Infrastructure


{
    public static class Startup
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration config) 
        {
            return services.AddCorsPolicy(config);
        }
    }
}
