using MebelOnline.Core.Models.Categories;
using MebelOnline.Core.Models.Products;

namespace MebelOnline.Core.Services
{
    public interface IProductService
    {
        Task<IEnumerable<ProductCardModel>> GetLatestProducts();
        Task<IEnumerable<CategoryBreadcrumb>> GetBreadcrumbs(int productId);
    }
}
