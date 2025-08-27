using MebelOnline.Core.Models.Common;
using MebelOnline.Core.Models.Products;

namespace MebelOnline.Core.Services
{
    public interface ISearchService
    {
        Task<PagedResultModel<ProductCardModel>> GetProductsBySearchParams(SearchParamsModel searchParams);
    }
}
