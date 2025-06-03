using MebelOnline.Core.Mappings;
using MebelOnline.Core.Models.Categories;
using MebelOnline.Db.Entities;
using MebelOnline.Db;
using MebelOnline.Core.Helpers.Categories;
using Microsoft.EntityFrameworkCore;

namespace MebelOnline.Core.Services.Impl
{
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMappingService<CategoryEntity, CategoryModel> _mapper;

        public CategoryService(AppDbContext dbContext, IMappingService<CategoryEntity, CategoryModel> mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CategoryRevertedModel>> GetCategoriesHierarchyAsync()
        {
            var entities = await _dbContext.Categories
                            .Include(c => c.ParentCategory)
                                .ThenInclude(pc => pc.ParentCategory)
                            .Where(c => c.HasProducts)
                            .OrderBy(c => c.Id)
                            .ToListAsync();

            var mappedModels = _mapper.MapList(entities);
            var revertedModels = CategoryTransformer.ConvertHierarchy(mappedModels);

            return revertedModels;
        }

        public async Task<IEnumerable<CategoryBreadcrumbModel>> GetBreadcrumbsAsync(int productId)
        {
            var product = await _dbContext.Products
                .FirstOrDefaultAsync(p => p.Id == productId);

            var category = await _dbContext.Categories
                .Include(c => c.ParentCategory)
                    .ThenInclude(pc => pc.ParentCategory)
                .FirstOrDefaultAsync(c => c.Id == product.CategoryId);

            var mappedCategory = _mapper.Map(category);
            var convertedList = CategoryTransformer.ConvertToBreadcrumb(mappedCategory);

            return convertedList;
        }
    }
}
