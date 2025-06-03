using MebelOnline.Core.Mappings;
using MebelOnline.Core.Models.Products;
using MebelOnline.Db.Entities;
using MebelOnline.Db;
using Microsoft.EntityFrameworkCore;

namespace MebelOnline.Core.Services.Impl
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMappingService<ProductEntity, ProductCardModel> _productMapper;

        public ProductService(AppDbContext dbContext, IMappingService<ProductEntity, ProductCardModel> productMapper)
        {
            _dbContext = dbContext;
            _productMapper = productMapper;
        }

        public async Task<IEnumerable<ProductCardModel>> GetLatestProductsAsync()
        {
            var entities = await _dbContext.Products
                .Include(p => p.Images)
                .OrderBy(p => p.Id)
                .Take(12) // TODO: remove magic number
                .ToListAsync();

            var mappedModels = _productMapper.MapList(entities);

            return mappedModels;
        }
    }
}
