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
        private readonly IMappingService<CategoryEntity, CategoryModel> _categoryMapper;
        private readonly IMappingService<CategoryEntity, CategoryCatalogModel> _categoryCatalogMapper;

        public CategoryService(AppDbContext dbContext, 
            IMappingService<CategoryEntity, CategoryModel> categoryMapper,
            IMappingService<CategoryEntity, CategoryCatalogModel> categoryCatalogMapper)
        {
            _dbContext = dbContext;
            _categoryMapper = categoryMapper;
            _categoryCatalogMapper = categoryCatalogMapper;
        }

        public async Task<IEnumerable<CategoryRevertedModel>> GetCategoriesHierarchyAsync()
        {
            var entities = await _dbContext.Categories
                            .Include(c => c.ParentCategory)
                                .ThenInclude(pc => pc.ParentCategory)
                            .Where(c => c.HasProducts)
                            .OrderBy(c => c.Id)
                            .ToListAsync();

            var mappedModels = _categoryMapper.MapList(entities);
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

            var mappedCategory = _categoryMapper.Map(category);
            var convertedList = CategoryTransformer.ConvertToBreadcrumb(mappedCategory);

            return convertedList;
        }

        public async Task<IEnumerable<CategoryCatalogModel>> GetCatalogAsync()
        {
            var categories = await _dbContext.Categories
                .Where(c => c.ParentCategoryId == null || c.ParentCategory.ParentCategoryId == null)
                .Include(c => c.ParentCategory)
                .ToListAsync();

            var groupedCatalog = new List<CategoryCatalogModel>();
            var parentCategories = categories.Where(c => c.ParentCategoryId == null).ToList();
            var childCategories = categories.Where(c => c.ParentCategoryId != null).ToList();

            var mappedCatalog = _categoryCatalogMapper.MapList(parentCategories);

            foreach (var category in mappedCatalog)
            {
                var currentCategoryChilren = childCategories.Where(c => c.ParentCategoryId == category.Id).ToList();

                category.SubCategories = _categoryCatalogMapper.MapList(currentCategoryChilren);
            }

            return mappedCatalog;
        }
    }
}
