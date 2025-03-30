using AutoMapper;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Exceptions;

namespace SpeedReaderAPI.Services.Impl;

public class CategoryService : ICategoryService
{
    private readonly CombinedRepositories _context;
    private readonly IImageService _imageService;
    private readonly IMapper _mapper;
    private readonly IAuthService _authService;


    public CategoryService(ApplicationContext context, IMapper mapper, IImageService imageService, IAuthService authService)
    {
        _context = new CombinedRepositories(context);
        _mapper = mapper;
        _authService = authService;
        _imageService = imageService;
    }

    public CategoryResponse CreateCategory(CategoryCreateRequest request)
    {
        User? user = _authService.GetAuthenticatedUser();
        if (user == null) throw new UnauthorizedAccessException();

        Category createdCategory = _mapper.Map<Category>(request);
        createdCategory.UserId = user.Id;
        _context.Category.Add(createdCategory);
        _context.SaveChanges();
        return _mapper.Map<CategoryResponse>(createdCategory);
    }

    public void DeleteCategory(int categoryId)
    {
        User? user = _authService.GetAuthenticatedUser();
        Category? categoryFound = _context.Category.FindById(categoryId);
        if (categoryFound == null) 
            throw new ResourceNotFoundException($"Category with ID {categoryId} not found.");
        if (user?.Id != categoryFound.UserId) 
            throw new UnauthorizedAccessException();

        if (categoryFound.Image != null && categoryFound.Image.HasValue)
        {
            _imageService.Delete((Image)categoryFound.Image);
        }

        _context.Category.Remove(categoryFound);
        _context.SaveChanges();
    }

    public void DeleteImage(int id)
    {
        User? user = _authService.GetAuthenticatedUser();
        Category? categoryFound = _context.Category.FindById(id);
        if (categoryFound == null) {
            throw new ResourceNotFoundException($"Category with ID {id} not found.");
        }
        if (user?.Id != categoryFound.UserId) 
            throw new UnauthorizedAccessException();
        if (categoryFound.Image == null || !categoryFound.Image.HasValue) return;
        _imageService.Delete((Image)categoryFound.Image);

        categoryFound.Image = null;
        _context.SaveChanges();
    }

    public CategoryResponse GetCategoryById(int id)
    {
        Category? categoryFound = _context.Category.FindById(id);
        if (categoryFound == null)
        {
            throw new ResourceNotFoundException($"Category with ID {id} not found.");
        }
        return _mapper.Map<CategoryResponse>(categoryFound);
    }

    public long GetCount()
    {
        return _context.Category.Count();
    }

    public Image GetImage(int id)
    {
        Category? categoryFound = _context.Category.FindById(id);
        if (categoryFound == null)
        {
            throw new ResourceNotFoundException($"Category with ID {id} not found.");
        }
        try
        {
            if (!categoryFound.Image.HasValue) throw new Exception();
            Image img = categoryFound.Image.Value;
            Stream? stream = _imageService.Get(img);
            if (stream == null) throw new Exception();
            img.FileStream = stream;
            return img;
        }
        catch (Exception)
        {
            throw new ResourceNotFoundException($"Category with ID {id} doesn't have an image.");
        }
    }

    public PageResponse<CategoryResponse> SearchCategories(QueryParameters queryParameters)
    {
        long categoryCount = _context.Category.Count();
        List<Category> categories = _context.Category.GetPaged((queryParameters.PageNumber - 1) * queryParameters.PageSize, queryParameters.PageSize)
                                                        .Where(a => (string.IsNullOrEmpty(queryParameters.Search) || a.Title.Contains(queryParameters.Search))
                                                        && (queryParameters.UserId == null || a.UserId == queryParameters.UserId))
                                                        .ToList();
        List<CategoryResponse> categoryResponseList = _mapper.Map<List<CategoryResponse>>(categories);
        return new PageResponse<CategoryResponse>(categoryCount, categoryResponseList);
    }

    public CategoryResponse UpdateCategory(int id, CategoryUpdateRequest request)
    {
        User? user = _authService.GetAuthenticatedUser();
        Category? categoryFound = _context.Category.FindById(id);
        if (categoryFound == null)
        {
            throw new ResourceNotFoundException($"Category with ID {id} not found.");
        }
        if (user?.Id != categoryFound.UserId) 
            throw new UnauthorizedAccessException();

        if (request.Title != null)
        {
            categoryFound.Title = request.Title;
        }
        if (request.Text != null)
        {
            categoryFound.Text = request.Text;
        }

        _context.SaveChanges();
        return _mapper.Map<CategoryResponse>(categoryFound);

    }

    public async Task<CategoryResponse> UploadImage(int id, ImageUploadRequest request)
    {
        User? user = _authService.GetAuthenticatedUser();
        Category? categoryFound = _context.Category.FindById(id);
        if (categoryFound == null)
        {
            throw new ResourceNotFoundException($"Category with ID {id} not found.");
        }
        if (user?.Id != categoryFound.UserId) 
            throw new UnauthorizedAccessException();
        if (categoryFound.Image.HasValue)
        {
            throw new ResourceAlreadyExistsException($"Category with ID {id} has an image.");
        }
        categoryFound.Image = await _imageService.Create(request);
        await _context.SaveChangesAsync();
        
        return _mapper.Map<CategoryResponse>(categoryFound);
    }
}