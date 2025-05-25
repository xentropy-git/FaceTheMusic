namespace FaceTheMusic.Domain.Entities;

public class TriviaQuestion
{
    public int Id { get; set; }
    public string Question { get; set; } = string.Empty;
    public string Answer { get; set; } = string.Empty;
}
