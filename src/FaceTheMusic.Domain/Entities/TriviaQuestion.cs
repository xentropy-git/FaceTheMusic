using System.ComponentModel.DataAnnotations;

namespace FaceTheMusic.Domain.Entities;

public class TriviaQuestion
{
    [Key]
    public int Id { get; set; }
    [Required]
    [MaxLength(500)]
    public string Question { get; set; } = string.Empty;
    [Required]
    [MaxLength(500)]
    public string Answer { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;

    public bool IsActive { get; set; } = true;
}
