using MebelOnline.Core.Mappings;
using MebelOnline.Core.Models.Products;
using MebelOnline.Db.Entities;
using MebelOnline.Db;
using Microsoft.EntityFrameworkCore;
using MebelOnline.Db.Enums;

namespace MebelOnline.Core.Services.Impl
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMappingService<ProductEntity, ProductCardModel> _productMapper;
        private readonly IProductOptionService _productOptionService;

        public ProductService(AppDbContext dbContext, IMappingService<ProductEntity, ProductCardModel> productMapper,
            IProductOptionService productOptionService)
        {
            _dbContext = dbContext;
            _productMapper = productMapper;
            _productOptionService = productOptionService;
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

        public async Task GetProductDetailsByIdAsync(int productId)
        {
            var product = await _dbContext.Products
                .Include(p => p.Attributes)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Id == productId);

            var mappedFrontOptions = await _productOptionService.GetForProductByOptionTypeAsync(productId, 
                ProductOptionTypeEnum.Front);
            var mappedFrameOptions = await _productOptionService.GetForProductByOptionTypeAsync(productId,
                ProductOptionTypeEnum.Frame);
        }
    }
}
