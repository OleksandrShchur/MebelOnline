using MebelOnline.Core.Models.Common;
using MebelOnline.Core.Models.Products;
using MebelOnline.Core.Models.Search;

namespace MebelOnline.Core.Services
{
    public interface ISearchService
    {
        Task<PagedResultModel<ProductCardModel>> GetProductsBySearchParamsAsync(SearchParamsModel searchParams);
        Task<SearchSidebarModel> GetSearchSidebarParamsAsync(SearchParamsModel searchParams);
    }
}
