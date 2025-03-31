namespace SpeedReaderAPI.Services;

using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.DTOs.Question.Requests;
using SpeedReaderAPI.DTOs.Question.Responses;

public interface IQuestionService : IServiceWithImage<QuestionResponse>
{
    QuestionResponse CreateQuestion(QuestionCreateRequest request);
    public QuestionResponse GetQuestion(int idquestionId);
    public PageResponse<QuestionResponse> SearchQuestions(QueryParameters queryParameters);
    QuestionResponse UpdateQuestion(int questionId, QuestionUpdateRequest request);
    void DeleteQuestion(int questionId);
    long GetCount();
}
