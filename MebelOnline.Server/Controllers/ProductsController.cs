using MebelOnline.Db.Entities;
using MebelOnline.Db;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MebelOnline.Core.Models.Products;
using MebelOnline.Core.Mappings;
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
            var products = await _productService.GetLatestProducts();

            return products;
        }

        [HttpGet]
        [Route("breadcrumbs")]
        public async Task<IEnumerable<string>> GetBreadcrumbs([FromQuery]int productId)
        {
            return null;
        }
    }
}
