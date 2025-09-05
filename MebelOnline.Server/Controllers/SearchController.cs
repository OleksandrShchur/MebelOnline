using MebelOnline.Core.Models.Common;
using MebelOnline.Core.Models.Products;
using MebelOnline.Core.Models.Search;
using MebelOnline.Core.Services;
using Microsoft.AspNetCore.Mvc;

namespace MebelOnline.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly ISearchService _searchService;

        public SearchController(ISearchService searchService)
        {
            _searchService = searchService;
        }

        [HttpGet]
        public async Task<PagedResultModel<ProductCardModel>> SearchByParams([FromQuery] SearchParamsModel searchParams)
        {
            var pagedResult = await _searchService.GetProductsBySearchParamsAsync(searchParams);

            return pagedResult;
        }

        [HttpGet]
        [Route("sidebar")]
        public async Task<SearchSidebarModel> GetSidebarParams([FromQuery] SearchParamsModel searchParams)
        {
            var sidebarParams = await _searchService.GetSearchSidebarParamsAsync(searchParams);

            return sidebarParams;
        }
    }
}