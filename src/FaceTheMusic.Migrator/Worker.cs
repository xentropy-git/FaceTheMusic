using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using OpenTelemetry.Trace;
using FaceTheMusic.Infrastructure.Data;
namespace FaceTheMusic.Migrator;

public class Worker : BackgroundService
{
    internal const string ActivityName = "Migrator";
    private static readonly ActivitySource _activitySource = new(ActivityName);
    private readonly ILogger<Worker> _logger;
    private readonly IServiceProvider _serviceProvider;
    private readonly IHostApplicationLifetime _lifetime;

    public Worker(ILogger<Worker> logger,
            IServiceProvider serviceProvider,
        IHostApplicationLifetime lifetime)
    {
        _serviceProvider = serviceProvider;
        _lifetime = lifetime;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
		using var activity = _activitySource.StartActivity("Migrating database", ActivityKind.Client);

		try
		{
            _logger.LogInformation("Migrating database...");
			using var scope = _serviceProvider.CreateScope();
			var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

			await dbContext.Database.MigrateAsync(stoppingToken);
            _logger.LogInformation("Database migration completed.");

		}
		catch (Exception ex)
		{
			activity?.RecordException(ex);
			throw;
		}

		_lifetime.StopApplication();
    }
}
