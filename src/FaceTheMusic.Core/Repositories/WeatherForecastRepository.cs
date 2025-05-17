using FaceTheMusic.Core.Models;
using FaceTheMusic.Core.Repositories.Interfaces;

namespace FaceTheMusic.Core.Repositories;

public class WeatherForecastRepository : IWeatherForecastRepository
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing",
        "Bracing",
        "Chilly",
        "Cool",
        "Mild",
        "Warm",
        "Balmy",
        "Hot",
        "Sweltering",
        "Scorching",
    };

    public IEnumerable<WeatherForecast> GetForecasts()
    {
        return Enumerable
            .Range(1, 5)
            .Select(index => new WeatherForecast(
                DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                Random.Shared.Next(-20, 55),
                Summaries[Random.Shared.Next(Summaries.Length)]
            ));
    }
}
