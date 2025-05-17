using FaceTheMusic.Core.Models;

namespace FaceTheMusic.Core.Repositories.Interfaces;

public interface IWeatherForecastRepository
{
    IEnumerable<WeatherForecast> GetForecasts();
}
