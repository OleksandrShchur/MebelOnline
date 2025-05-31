using MebelOnline.Core.Mappings;
using MebelOnline.Core.Models.Products;
using MebelOnline.Db.Entities;
using MebelOnline.Db;
using Microsoft.EntityFrameworkCore;
using MebelOnline.Core.Models.Categories;

namespace MebelOnline.Core.Services.Impl
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMappingService<ProductEntity, ProductCardModel> _productMapper;
        private readonly IMappingService<CategoryEntity, ProductCardModel> _categoryMapper;

        public ProductService(AppDbContext dbContext, IMappingService<ProductEntity, ProductCardModel> productMapper,
            IMappingService<CategoryEntity, ProductCardModel> categoryMapper)
        {
            _dbContext = dbContext;
            _productMapper = productMapper;
            _categoryMapper = categoryMapper;
        }

        public async Task<IEnumerable<ProductCardModel>> GetLatestProducts()
        {
            var entities = await _dbContext.Products
                .Include(p => p.Images)
                .OrderBy(p => p.Id)
                .Take(12) // TODO: remove magic number
                .ToListAsync();

            var mappedModels = _productMapper.MapList(entities);

            return mappedModels;
        }

        public async Task<IEnumerable<CategoryBreadcrumb>> GetBreadcrumbs(int productId)
        {
            var product = await _dbContext.Products
                .FirstOrDefaultAsync(p => p.Id == productId);

            var categories = await _dbContext.Categories
                .Include(c => c.ParentCategory)
                    .ThenInclude(pc => pc.ParentCategory)
                .ToListAsync();

            var mappedCategories = _categoryMapper.MapList(categories);

            return null;
        }
    }
}
