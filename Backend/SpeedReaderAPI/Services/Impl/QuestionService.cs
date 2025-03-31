using System.Data;
using AutoMapper;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.DTOs.Question.Requests;
using SpeedReaderAPI.DTOs.Question.Responses;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Exceptions;
using SpeedReaderAPI.helpers;
namespace SpeedReaderAPI.Services.Impl;


public class QuestionService : IQuestionService
{

    private readonly CombinedRepositories _context;
    private readonly IMapper _mapper;
    private readonly IImageService _imageService;
    private readonly IAuthService _authService;

    public QuestionService(ApplicationContext context, IMapper mapper, IImageService imageService, IAuthService authService)
    {
        _context = new CombinedRepositories(context);
        _mapper = mapper;
        _imageService = imageService;
        _authService = authService;
    }

    public QuestionResponse GetQuestion(int id)
    {
        Question? question = _context.Question.FindById(id);
        if (question == null)
        {
            throw new ResourceNotFoundException($"Question with ID {id} not found.");
        }
        return _mapper.Map<QuestionResponse>(question);

    }
    public QuestionResponse CreateQuestion(QuestionCreateRequest request)
    {
        User? user = _authService.GetAuthenticatedUser();
        Paragraph? paragraphFound = _context.Paragraph.FindById(request.ParagraphId);
        if (paragraphFound == null)
        {
            throw new ResourceNotFoundException($"Paragraph with ID {request.ParagraphId} not found.");
        }
        if (paragraphFound.UserId != user?.Id) 
            throw new UnauthorizedAccessException();

        if (request.CorrectAnswerIndex < 0 || request.CorrectAnswerIndex >= request.AnswerChoices.Length)
        {
            throw new IndexOutOfRangeException("Correct answer index out of bounds");
        }

        Question createdQuestion = _mapper.Map<Question>(request);
        createdQuestion.UserId = user.Id;
        _context.Question.Add(createdQuestion);
        _context.SaveChanges();
        paragraphFound.QuestionIds.Add(createdQuestion.Id);
        _context.SaveChanges();

        return _mapper.Map<QuestionResponse>(createdQuestion);
    }

    public QuestionResponse UpdateQuestion(int id, QuestionUpdateRequest request)
    {
        User? user = _authService.GetAuthenticatedUser();
        Question? questionFound = _context.Question.FindById(id);
        if (questionFound == null)
        {
            throw new ResourceNotFoundException($"Question with ID {id} not found.");
        }
        if (questionFound.UserId != user?.Id) 
            throw new UnauthorizedAccessException();

        Paragraph? oldParagraphFound = _context.Paragraph.FindById(questionFound.ParagraphId);
        if (oldParagraphFound == null) throw new Exception("Illegal state, paragraph of question must exist");

        if (request.CorrectAnswerIndex != null)
        {
            bool isIndexOutOfRequestBounds = request.AnswerChoices != null &&
                                     request.CorrectAnswerIndex >= request.AnswerChoices.Length;
            bool isIndexOutOfQuestionBounds = request.AnswerChoices == null &&
                                        request.CorrectAnswerIndex >= questionFound.AnswerChoices.Length;
            if (request.CorrectAnswerIndex < 0 || isIndexOutOfRequestBounds || isIndexOutOfQuestionBounds)
            {
                throw new IndexOutOfRangeException("Correct answer index is out of bounds.");
            }
        }
        else if (request.AnswerChoices != null)
        {
            if (questionFound.CorrectAnswerIndex >= request.AnswerChoices.Length)
            {
                throw new IndexOutOfRangeException("Correct answer index is out of bounds.");
            }
        }

        // Update if set in request
        if (request.ParagraphId != null)
        {
            Paragraph? newParagrahFound = _context.Paragraph.FindById(request.ParagraphId.Value);
            if (newParagrahFound == null)
            {
                throw new ResourceNotFoundException($"Paragraph with ID {request.ParagraphId} not found.");
            }
            if (newParagrahFound.UserId != user?.Id) 
                throw new UnauthorizedAccessException();
            oldParagraphFound.QuestionIds.Remove(id);
            newParagrahFound.QuestionIds.Add(id);
            questionFound.ParagraphId = newParagrahFound.Id;
        }
        if (request.AnswerChoices != null)
        {
            questionFound.AnswerChoices = request.AnswerChoices;
        }
        if (request.CorrectAnswerIndex != null)
        {
            questionFound.CorrectAnswerIndex = (int)request.CorrectAnswerIndex;
        }
        if (request.QuestionText != null)
        {
            questionFound.QuestionText = request.QuestionText;
        }

        _context.SaveChanges();
        return _mapper.Map<QuestionResponse>(questionFound);
    }

    public void DeleteQuestion(int id)
    {
        User? user = _authService.GetAuthenticatedUser();
        Question? questionFound = _context.Question.FindById(id);
        if (questionFound == null)
            throw new ResourceNotFoundException($"Question with ID {id} not found.");
        if (questionFound.UserId != user?.Id) 
            throw new UnauthorizedAccessException();

        Paragraph? paragraphFound = _context.Paragraph.FindById(questionFound.ParagraphId);
        if (paragraphFound == null) throw new Exception("Illegal state, paragraph  of question must exist");
        paragraphFound.QuestionIds.Remove(id);

        if (questionFound.ImageFileName != null && questionFound.Image.HasValue)
        {
            _imageService.Delete((Image)questionFound.Image);
        }
        _context.Question.Remove(questionFound);
        _context.SaveChanges();
    }

    public PageResponse<QuestionResponse> SearchQuestions(QueryParameters queryParameters)
    {
        long questionCount = _context.Question.Count();
        List<Question> questions = _context.Question.GetPaged((queryParameters.PageNumber - 1) * queryParameters.PageSize, queryParameters.PageSize)
                                                    .Where(a => (string.IsNullOrEmpty(queryParameters.Search) || a.QuestionText.Contains(queryParameters.Search))
                                                    && (queryParameters.UserId == null || a.UserId == queryParameters.UserId))
                                                    .ToList();
        var sortedList = Sorter.SortList(questions, asc: false);
        List<QuestionResponse> questionResponseList = _mapper.Map<List<QuestionResponse>>(sortedList);
        return new PageResponse<QuestionResponse>(questionCount, questionResponseList);
    }
    public async Task<QuestionResponse> UploadImage(int id, ImageUploadRequest request)
    {
        User? user = _authService.GetAuthenticatedUser();
        Question? questionFound = _context.Question.FindById(id);
        if (questionFound == null)
            throw new ResourceNotFoundException($"Question with ID {id} not found.");
        if (questionFound.UserId != user?.Id) 
            throw new UnauthorizedAccessException();
        if (questionFound.Image.HasValue)
        {
            throw new ResourceAlreadyExistsException($"Paragraph with ID {id} has an image.");
        }
        questionFound.Image = await _imageService.Create(request);
        await _context.SaveChangesAsync();

        return _mapper.Map<QuestionResponse>(questionFound);
    }

    public Image GetImage(int id)
    {
        Question? questionFound = _context.Question.FindById(id);
        if (questionFound == null)
        {
            throw new ResourceNotFoundException($"Question with ID {id} not found.");
        }
        try
        {
            if (!questionFound.Image.HasValue) throw new Exception();
            Image img = questionFound.Image.Value;
            Stream? stream = _imageService.Get(img);
            if (stream == null) throw new Exception();
            img.FileStream = stream;
            return img;
        }
        catch (Exception)
        {
            throw new ResourceNotFoundException($"Question with ID {id} doesn't have an image.");
        }
    }

    public void DeleteImage(int id)
    {
        User? user = _authService.GetAuthenticatedUser();
        Question? questionFound = _context.Question.FindById(id);
        if (questionFound == null)
            throw new ResourceNotFoundException($"Question with ID {id} not found.");
        if (questionFound.UserId != user?.Id) 
            throw new UnauthorizedAccessException();
            
        if (questionFound.Image == null || !questionFound.Image.HasValue) return;
        _imageService.Delete((Image)questionFound.Image);

        questionFound.Image = null;
        _context.SaveChanges();
    }

    public long GetCount()
    {
        return _context.Question.Count();
    }
}
