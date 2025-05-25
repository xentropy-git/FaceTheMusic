using FaceTheMusic.Infrastructure.Repositories;
using FaceTheMusic.Infrastructure.Data;
using FaceTheMusic.Infrastructure.Extensions;
using FaceTheMusic.Domain.Interfaces;
using FaceTheMusic.Domain.Services;

var builder = WebApplication.CreateBuilder(args);

// Add service defaults (Aspire)
builder.AddServiceDefaults();

// Add Infrastructure
//builder.Services.AddInfrastructure(builder.Configuration);
builder.AddNpgsqlDbContext<ApplicationDbContext>("database");

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Register services and repositories
builder.Services.AddScoped<IWeatherForecastRepository, WeatherForecastRepository>();
builder.Services.AddScoped<IWeatherForecastService, WeatherForecastService>();

// Add CORS for client application
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapDefaultEndpoints();

app.UseHttpsRedirection();
app.UseCors();
app.MapControllers();
app.MapGet("/", () => "FaceTheMusic API is running!");

app.Run();
