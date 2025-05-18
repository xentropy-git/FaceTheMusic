using FaceTheMusic.Domain.Models;

namespace FaceTheMusic.Domain.Interfaces;

public interface IWeatherForecastService
{
    IEnumerable<WeatherForecast> GetForecasts();
}
