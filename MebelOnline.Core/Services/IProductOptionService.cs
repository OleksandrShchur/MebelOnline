using MebelOnline.Core.Models.ProductOptions;
using MebelOnline.Db.Enums;

namespace MebelOnline.Core.Services
{
    public interface IProductOptionService
    {
        Task<IEnumerable<ProductOptionModel>> GetForProductByOptionTypeAsync(int productId, ProductOptionTypeEnum type);
    }
}
