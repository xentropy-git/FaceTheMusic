using Scalar.AspNetCore;
using FaceTheMusic.Core.Repositories;
using FaceTheMusic.Core.Repositories.Interfaces;
using FaceTheMusic.Core.Services;
using FaceTheMusic.Core.Services.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add service defaults (Aspire)
builder.AddServiceDefaults();

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
