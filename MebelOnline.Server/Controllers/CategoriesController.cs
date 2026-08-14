using MebelOnline.Core.Models.Categories;
using MebelOnline.Core.Services;
using Microsoft.AspNetCore.Mvc;

namespace MebelOnline.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        [Route("all")]
        [ProducesResponseType(typeof(IEnumerable<CategoryRevertedModel>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<CategoryRevertedModel>>> GetAll(CancellationToken cancellationToken)
        {
            var categories = await _categoryService.GetCategoriesHierarchyAsync(cancellationToken);
            return Ok(categories);
        }

        [HttpGet]
        [Route("breadcrumbs/{productId:int}")]
        [ProducesResponseType(typeof(IEnumerable<CategoryBreadcrumbModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<CategoryBreadcrumbModel>>> GetBreadcrubmsForProduct(
            [FromRoute] int productId,
            CancellationToken cancellationToken)
        {
            if (productId <= 0)
            {
                return ValidationProblem(new ValidationProblemDetails(new Dictionary<string, string[]>
                {
                    [nameof(productId)] = ["Product id must be greater than 0."]
                }));
            }

            var breadcrumbs = await _categoryService.GetBreadcrumbsAsync(productId, cancellationToken);
            if (breadcrumbs == null)
            {
                return NotFound(CreateNotFoundProblem($"Product {productId} was not found."));
            }

            return Ok(breadcrumbs);
        }

        [HttpGet]
        [Route("catalog")]
        [ProducesResponseType(typeof(IEnumerable<CategoryCatalogModel>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<CategoryCatalogModel>>> GetCatalog(CancellationToken cancellationToken)
        {
            var catalog = await _categoryService.GetCatalogAsync(cancellationToken);
            return Ok(catalog);
        }

        [HttpGet]
        [Route("{categoryId:int}")]
        [ProducesResponseType(typeof(CategoryDetailsModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CategoryDetailsModel>> GetById(
            [FromRoute] int categoryId,
            CancellationToken cancellationToken)
        {
            if (categoryId <= 0)
            {
                return ValidationProblem(new ValidationProblemDetails(new Dictionary<string, string[]>
                {
                    [nameof(categoryId)] = ["Category id must be greater than 0."]
                }));
            }

            var category = await _categoryService.GetCategoryByIdAsync(categoryId, cancellationToken);
            if (category == null)
            {
                return NotFound(CreateNotFoundProblem($"Category {categoryId} was not found."));
            }

            return Ok(category);
        }

        private ProblemDetails CreateNotFoundProblem(string detail)
        {
            return new ProblemDetails
            {
                Status = StatusCodes.Status404NotFound,
                Title = "Not Found",
                Detail = detail,
                Instance = HttpContext.Request.Path
            };
        }
    }
}
