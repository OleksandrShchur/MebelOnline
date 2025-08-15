using MebelOnline.Core.Models.Categories;
using MebelOnline.Db.Entities;
using MebelOnline.Db;
using MebelOnline.Core.Helpers.Categories;
using Microsoft.EntityFrameworkCore;
using MebelOnline.Core.Mappings.Config;

namespace MebelOnline.Core.Services.Impl
{
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public CategoryService(AppDbContext dbContext,
            IMapper mapper)
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

            var mappedModels = _mapper.MapList<CategoryEntity, CategoryModel>(entities);
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

            var mappedCategory = _mapper.Map<CategoryEntity, CategoryModel>(category);
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

            var mappedCatalog = _mapper.MapList<CategoryEntity, CategoryCatalogModel>(parentCategories);

            foreach (var category in mappedCatalog)
            {
                var currentCategoryChilren = childCategories.Where(c => c.ParentCategoryId == category.Id).ToList();

                category.SubCategories = _mapper.MapList<CategoryEntity, CategoryCatalogModel>(currentCategoryChilren);
            }

            return mappedCatalog;
        }
    }
}
