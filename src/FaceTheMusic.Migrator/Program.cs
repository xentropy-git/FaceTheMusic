using FaceTheMusic.Migrator;
using FaceTheMusic.Infrastructure.Data;

var builder = Host.CreateApplicationBuilder(args);
builder.AddServiceDefaults();

builder.AddNpgsqlDbContext<ApplicationDbContext>("triviadb");
builder.Services.AddHostedService<Worker>();
builder.Services.AddOpenTelemetry()
    .WithTracing(tracing => tracing.AddSource(Worker.ActivityName));

var host = builder.Build();
host.Run();
