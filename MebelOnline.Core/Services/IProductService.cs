using MebelOnline.Core.Models.Products;

namespace MebelOnline.Core.Services
{
    public interface IProductService
    {
        Task<IEnumerable<ProductCardModel>> GetLatestProductsAsync();
        Task<ProductDetailsModel> GetProductDetailsByIdAsync(int productId);
    }
}
