using MebelOnline.Core.Models.Categories;

namespace MebelOnline.Core.Services
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryRevertedModel>> GetCategoriesHierarchy();
        Task<Cate>
    }
}
