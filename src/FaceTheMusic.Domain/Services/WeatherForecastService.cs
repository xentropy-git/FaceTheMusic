using FaceTheMusic.Domain.Models;
using FaceTheMusic.Domain.Interfaces;

namespace FaceTheMusic.Domain.Services;

public class WeatherForecastService : IWeatherForecastService
{
    private readonly IWeatherForecastRepository _repository;

    public WeatherForecastService(IWeatherForecastRepository repository)
    {
        _repository = repository;
    }

    public IEnumerable<WeatherForecast> GetForecasts()
    {
        return _repository.GetForecasts();
    }
}
