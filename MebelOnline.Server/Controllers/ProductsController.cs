using MebelOnline.Db.Entities;
using MebelOnline.Db;
using MebelOnline.Server.Mappings;
using MebelOnline.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MebelOnline.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private readonly IMappingService<ProductEntity, ProductModel> _mapper;

        public ProductsController(AppDbContext dbContext, IMappingService<ProductEntity, ProductModel> mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("all")]
        public async Task<IEnumerable<ProductModel>> GetAll()
        {
            var entities = await _dbContext.Products
                .OrderBy(p => p.Id)
                .ToListAsync();

            var mappedModels = _mapper.MapList(entities);

            return mappedModels;
        }
    }
}
