using FaceTheMusic.Core.Models;

namespace FaceTheMusic.Core.Services.Interfaces;

public interface IWeatherForecastService
{
    IEnumerable<WeatherForecast> GetForecasts();
}
