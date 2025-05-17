using FaceTheMusic.Core.Models;
using FaceTheMusic.Core.Repositories.Interfaces;
using FaceTheMusic.Core.Services.Interfaces;

namespace FaceTheMusic.Core.Services;

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
