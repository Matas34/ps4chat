using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.Entities;
namespace SpeedReaderAPI.Services.Impl;

using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.DTOs.Question.Responses;
using SpeedReaderAPI.Exceptions;

public class UserService : IUserService
{
    private readonly IAuthService _authService;
    private readonly IImageService _imageService;
    private readonly CombinedRepositories _context;
    private readonly IMapper _mapper;

    private readonly ApplicationContext _context_t;

    public UserService(ApplicationContext context, IAuthService authService, IImageService imageService, IMapper mapper)
    {
        _mapper = mapper;
        _context = new CombinedRepositories(context);
        _authService = authService;
        _imageService = imageService;
        _context_t = context;
    }


    public UserInfoResponse GetMyInfo()
    {
        User? user = _authService.GetAuthenticatedUser();
        if (user == null)
            throw new UnauthorizedAccessException("User is not authenticated.");


        return new UserInfoResponse(
           user.Id,
           user.Username,
           user.WordsRead,
           user.SecondsRead / 60D,
           user.CorrectQuestions,
           user.TotalQuestions,
           user.ArticlesCountRead,
           user.ImageFileName
        );
    }

    public async Task<UserInfoResponse> UploadImage(int id, ImageUploadRequest request)
    {
        User? user = _authService.GetAuthenticatedUser();

        if (user == null)
            throw new UnauthorizedAccessException();

        user.Image = await _imageService.Create(request);
        await _context.SaveChangesAsync();

        return new UserInfoResponse(
           user.Id,
           user.Username,
           user.WordsRead,
           user.SecondsRead / 60D,
           user.CorrectQuestions,
           user.TotalQuestions,
           user.ArticlesCountRead,
           user.ImageFileName
        );
    }

    public Image GetImage(int id)
    {
        User? userFound = _context.User.FindById(id);
        if (userFound == null)
        {
            throw new ResourceNotFoundException($"User with ID {id} not found.");
        }
            if (!userFound.Image.HasValue) throw new ResourceNotFoundException($"User with ID {id} doesn't have an image.");
            Image img = userFound.Image.Value;
            Stream? stream = _imageService.Get(img);
            img.FileStream = stream;
            return img;
    }

    public void DeleteImage(int id)
    {
        User? user = _authService.GetAuthenticatedUser();

        if (user == null)
            throw new UnauthorizedAccessException();

        if (user.Image == null || !user.Image.HasValue) return;
        _imageService.Delete((Image)user.Image);

        user.Image = null;
        _context.SaveChanges();
    }


    public async Task ThumbsUp(long userId, int articleId)
    {
        User? user = _authService.GetAuthenticatedUser();

        if (user == null || user.Id != userId)
        {
            throw new UnauthorizedAccessException();
        }

        bool exists = await  _context_t.Likes.Where(x => x.UserId == userId && x.ArticleId == articleId).AnyAsync();

        if (!exists)
        {
            await _context_t.Likes.AddAsync(new Like(userId, articleId));
            await _context_t.SaveChangesAsync();
        }


    }


    public async Task  ThumbsDown(long userId, int articleId)
    {
        User? user = _authService.GetAuthenticatedUser();

        if (user == null || user.Id != userId)
        {
            throw new UnauthorizedAccessException();
        }

        var like = await _context_t.Likes.FirstOrDefaultAsync(x => x.UserId == userId && x.ArticleId == articleId);

        if (like!=null)
        {
            _context_t.Likes.Remove(like);
            await _context_t.SaveChangesAsync();
        }


    }

    public async Task<List<int>> LikedArticles(long userId)
    {
        if (_context_t.Likes.Any(x => x.UserId == userId))
        {

            var likedArticleIds = await _context_t.Likes
                .Where(l => l.UserId == userId)
                .Select(l => l.ArticleId)
                .ToListAsync();

            return likedArticleIds;
        }
        return null;
    }









}
