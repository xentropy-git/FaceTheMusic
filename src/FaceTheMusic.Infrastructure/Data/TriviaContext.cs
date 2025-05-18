namespace FaceTheMusic.Infrastructure.Data;

using FaceTheMusic.Domain.Entities;
using Microsoft.EntityFrameworkCore;

public class TriviaContext(DbContextOptions options) : DbContext (options)
{
    public DbSet<TriviaQuestion> TriviaQuestions => Set<TriviaQuestion>();
}
