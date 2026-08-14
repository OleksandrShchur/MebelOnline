using MebelOnline.Core.Models.Products;
using MebelOnline.Core.Services;
using Microsoft.AspNetCore.Mvc;

namespace MebelOnline.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        [Route("latest")]
        [ProducesResponseType(typeof(IEnumerable<ProductCardModel>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<ProductCardModel>>> GetLatest(CancellationToken cancellationToken)
        {
            var products = await _productService.GetLatestProductsAsync(cancellationToken);
            return Ok(products);
        }

        [HttpGet]
        [Route("{productId:int}")]
        [ProducesResponseType(typeof(ProductDetailsModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductDetailsModel>> GetById([FromRoute] int productId, CancellationToken cancellationToken)
        {
            if (productId <= 0)
            {
                return ValidationProblem(new ValidationProblemDetails(new Dictionary<string, string[]>
                {
                    [nameof(productId)] = ["Product id must be greater than 0."]
                }));
            }

            var product = await _productService.GetProductDetailsByIdAsync(productId, cancellationToken);
            if (product == null)
            {
                return NotFound(CreateNotFoundProblem($"Product {productId} was not found."));
            }

            return Ok(product);
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
