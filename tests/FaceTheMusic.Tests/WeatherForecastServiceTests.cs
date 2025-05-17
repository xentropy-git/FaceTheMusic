using FaceTheMusic.Core.Models;
using FaceTheMusic.Core.Repositories;
using FaceTheMusic.Core.Services;
using System.Linq;

namespace FaceTheMusic.Tests;

public class WeatherForecastServiceTests
{
    [Fact]
    public void GetForecasts_ReturnsCorrectNumberOfForecasts()
    {
        // Arrange
        var repository = new WeatherForecastRepository();
        var service = new WeatherForecastService(repository);

        // Act
        var forecasts = service.GetForecasts();

        // Assert
        Assert.Equal(5, forecasts.Count());
    }

    [Fact]
    public void WeatherForecast_CalculatesTemperatureF_Correctly()
    {
        // Arrange
        var forecast = new WeatherForecast(
            DateOnly.FromDateTime(DateTime.Now),
            20,
            "Mild"
        );

        // Act
        var tempF = forecast.TemperatureF;

        // Assert
        Assert.Equal(68, tempF);
    }
}
