using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.Services;

namespace SpeedReaderAPI;

public interface ICategoryService : IServiceWithImage<CategoryResponse>
{
    public CategoryResponse CreateCategory(CategoryCreateRequest request);
    public CategoryResponse GetCategoryById(int id);
    public PageResponse<CategoryResponse> SearchCategories(QueryParameters queryParameters);
    public CategoryResponse UpdateCategory(int id, CategoryUpdateRequest request);
    public void DeleteCategory(int categoryId);
    public long GetCount();
}