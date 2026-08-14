using MebelOnline.Core.Models.Products;

namespace MebelOnline.Core.Services
{
    public interface IProductService
    {
        Task<IEnumerable<ProductCardModel>> GetLatestProductsAsync(CancellationToken cancellationToken = default);
        Task<ProductDetailsModel?> GetProductDetailsByIdAsync(int productId, CancellationToken cancellationToken = default);
    }
}
