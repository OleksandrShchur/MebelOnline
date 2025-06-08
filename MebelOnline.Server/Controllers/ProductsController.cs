using Microsoft.AspNetCore.Mvc;
using MebelOnline.Core.Models.Products;
using MebelOnline.Core.Services;

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
        public async Task<IEnumerable<ProductCardModel>> GetLatest()
        {
            var products = await _productService.GetLatestProductsAsync();

            return products;
        }

        [HttpGet]
        [Route("{productId:int}")]
        public async Task GetById([FromRoute] int productId)
        {
            return;
        }
    }
}
