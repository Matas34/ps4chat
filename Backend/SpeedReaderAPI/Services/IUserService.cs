namespace SpeedReaderAPI.Services;

using SpeedReaderAPI.DTOs.Question.Responses;

public interface IUserService : IServiceWithImage<UserInfoResponse>
{
    UserInfoResponse GetMyInfo();


    public Task ThumbsUp(long userId, int articleId);

    public Task ThumbsDown(long userId, int articleId);

    public Task<List<int>> LikedArticles(long userId);
}
