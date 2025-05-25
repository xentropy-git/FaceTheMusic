using FaceTheMusic.Application.Common.Interfaces;
namespace FaceTheMusic.Infrastructure.Data;

using FaceTheMusic.Domain.Entities;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext(DbContextOptions options) : DbContext (options), IApplicationDbContext
{
    public DbSet<TriviaQuestion> TriviaQuestions => Set<TriviaQuestion>();
}
