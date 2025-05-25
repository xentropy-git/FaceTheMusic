using FaceTheMusic.Domain.Entities;

namespace FaceTheMusic.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<TriviaQuestion> TriviaQuestions { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
