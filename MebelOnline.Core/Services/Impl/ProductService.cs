using MebelOnline.Core.Mappings;
using MebelOnline.Core.Models.Products;
using MebelOnline.Db;
using MebelOnline.Db.Entities;
using Microsoft.EntityFrameworkCore;

namespace MebelOnline.Core.Services.Impl
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMappingService<ProductEntity, ProductCardModel> _productCardMapper;
        private readonly IMappingService<ProductEntity, ProductDetailsModel> _productDetailsMapper;

        public ProductService(AppDbContext dbContext, IMappingService<ProductEntity, ProductCardModel> productCardMapper,
            IMappingService<ProductEntity, ProductDetailsModel> productDetailsMapper)
        {
            _dbContext = dbContext;
            _productCardMapper = productCardMapper;
            _productDetailsMapper = productDetailsMapper;
        }

        public async Task<IEnumerable<ProductCardModel>> GetLatestProductsAsync()
        {
            var entities = await _dbContext.Products
                .Include(p => p.Images)
                .OrderBy(p => p.Id)
                .Take(12) // TODO: remove magic number
                .ToListAsync();

            var mappedModels = _productCardMapper.MapList(entities);

            return mappedModels;
        }

        public async Task<ProductDetailsModel> GetProductDetailsByIdAsync(int productId)
        {
            var entity = await _dbContext.Products
                .Include(p => p.Brand)
                .Include(p => p.Options)
                .Include(p => p.Attributes)
                    .ThenInclude(pa => pa.Attribute)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Id == productId);

            var mappedProduct = _productDetailsMapper.Map(entity);

            return mappedProduct;
        }
    }
}
