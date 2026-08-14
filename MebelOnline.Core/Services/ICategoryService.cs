using MebelOnline.Core.Models.Categories;

namespace MebelOnline.Core.Services
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryRevertedModel>> GetCategoriesHierarchyAsync(CancellationToken cancellationToken = default);
        Task<IEnumerable<CategoryBreadcrumbModel>?> GetBreadcrumbsAsync(int productId, CancellationToken cancellationToken = default);
        Task<IEnumerable<CategoryCatalogModel>> GetCatalogAsync(CancellationToken cancellationToken = default);
        Task<CategoryDetailsModel?> GetCategoryByIdAsync(int categoryId, CancellationToken cancellationToken = default);
    }
}
