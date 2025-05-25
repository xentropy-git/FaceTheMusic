using FaceTheMusic.Application.Common.Interfaces;
using FaceTheMusic.Domain.Entities;

namespace FaceTheMusic.Application.Features.TriviaQuestions.Create;

public sealed class CreateTriviaQuestionCommandHandler : IRequestHandler<CreateTriviaQuestionCommand, Result<CreateTriviaQuestionResponse>>
{
    IApplicationDbContext _context;

    public CreateTriviaQuestionCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async ValueTask<Result<CreateTriviaQuestionResponse>> Handle(CreateTriviaQuestionCommand request, CancellationToken cancellationToken)
    {
        var triviaQuestion = new TriviaQuestion(){
            Question = request.Question,
            Answer = request.Answer,
            CreatedAt = DateTime.UtcNow,
        };

        _context.TriviaQuestions.Add(triviaQuestion);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Ok(new CreateTriviaQuestionResponse(triviaQuestion.Id));
    }
}


