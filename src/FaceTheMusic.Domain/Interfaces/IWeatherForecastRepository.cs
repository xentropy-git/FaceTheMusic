using FaceTheMusic.Domain.Models;

namespace FaceTheMusic.Domain.Interfaces;

public interface IWeatherForecastRepository
{
    IEnumerable<WeatherForecast> GetForecasts();
}
