namespace FaceTheMusic.Application.Features.TriviaQuestions.Create;

public sealed record CreateTriviaQuestionCommand(
    string Question,
    string Answer,
    string Category,
    int DifficultyLevel) : IRequest<Result<CreateTriviaQuestionResponse>>;

