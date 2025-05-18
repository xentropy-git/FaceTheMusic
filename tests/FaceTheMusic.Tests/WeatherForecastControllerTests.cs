using FaceTheMusic.Api.Controllers;
using FaceTheMusic.Domain.Models;
using FaceTheMusic.Domain.Interfaces;
using Microsoft.Extensions.Logging;
using Moq;
using System.Collections.Generic;
using System.Linq;

namespace FaceTheMusic.Tests;

public class WeatherForecastControllerTests
{
    [Fact]
    public void Get_ReturnsForecasts_FromService()
    {
        // Arrange
        var mockService = new Mock<IWeatherForecastService>();
        var mockLogger = new Mock<ILogger<WeatherForecastController>>();
        
        var testForecasts = new List<WeatherForecast>
        {
            new WeatherForecast(DateOnly.FromDateTime(DateTime.Now), 20, "Mild"),
            new WeatherForecast(DateOnly.FromDateTime(DateTime.Now.AddDays(1)), 25, "Warm")
        };
        
        mockService.Setup(s => s.GetForecasts()).Returns(testForecasts);
        
        var controller = new WeatherForecastController(mockService.Object, mockLogger.Object);

        // Act
        var result = controller.Get();

        // Assert
        Assert.Equal(testForecasts.Count, result.Count());
        Assert.Equal(testForecasts, result);
    }
}
