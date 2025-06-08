using MebelOnline.Core.Models.Categories;

namespace MebelOnline.Core.Services
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryRevertedModel>> GetCategoriesHierarchyAsync();
        Task<IEnumerable<CategoryBreadcrumbModel>> GetBreadcrumbsAsync(int productId);
    }
}
