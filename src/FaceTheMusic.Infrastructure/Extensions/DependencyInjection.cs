using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using FaceTheMusic.Infrastructure.Data;

namespace FaceTheMusic.Infrastructure.Extensions;

public static class DependencyInjection
{
    public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<TriviaContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("database")
                ?? throw new InvalidOperationException("Connection string 'database' not found.")));
    }
}
