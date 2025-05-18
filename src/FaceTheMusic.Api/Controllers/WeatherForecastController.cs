using FaceTheMusic.Domain.Models;
using FaceTheMusic.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FaceTheMusic.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private readonly IWeatherForecastService _service;
    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(
        IWeatherForecastService service,
        ILogger<WeatherForecastController> logger
    )
    {
        _service = service;
        _logger = logger;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public IEnumerable<WeatherForecast> Get()
    {
        _logger.LogInformation("Getting weather forecasts");
        return _service.GetForecasts();
    }
}
