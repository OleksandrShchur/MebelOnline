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
        [ProducesResponseType(typeof(PagedResultModel<ProductCardModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<PagedResultModel<ProductCardModel>>> SearchByParams(
            [FromQuery] SearchParamsModel searchParams,
            CancellationToken cancellationToken)
        {
            var pagedResult = await _searchService.GetProductsBySearchParamsAsync(searchParams, cancellationToken);
            return Ok(pagedResult);
        }

        [HttpGet]
        [Route("sidebar")]
        [ProducesResponseType(typeof(SearchSidebarModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<SearchSidebarModel>> GetSidebarParams(
            [FromQuery] SearchParamsModel searchParams,
            CancellationToken cancellationToken)
        {
            var sidebarParams = await _searchService.GetSearchSidebarParamsAsync(searchParams, cancellationToken);
            return Ok(sidebarParams);
        }
    }
}
