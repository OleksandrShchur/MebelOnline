using MebelOnline.Db.Entities;
using MebelOnline.Db;
using MebelOnline.Server.Mappings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MebelOnline.Server.Models.Products;

namespace MebelOnline.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private readonly IMappingService<ProductEntity, ProductCardModel> _mapper;

        public ProductsController(AppDbContext dbContext, IMappingService<ProductEntity, ProductCardModel> mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("all")]
        public async Task<IEnumerable<ProductCardModel>> GetAll()
        {
            var entities = await _dbContext.Products
                .OrderBy(p => p.Id)
                .Take(12)
                .ToListAsync();

            var mappedModels = _mapper.MapList(entities);

            return mappedModels;
        }
    }
}
