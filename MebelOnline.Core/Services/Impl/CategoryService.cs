using MebelOnline.Core.Helpers.Categories;
using MebelOnline.Core.Mappings.Config;
using MebelOnline.Core.Models.Categories;
using MebelOnline.Db;
using MebelOnline.Db.Entities;
using Microsoft.EntityFrameworkCore;

namespace MebelOnline.Core.Services.Impl
{
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public CategoryService(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CategoryRevertedModel>> GetCategoriesHierarchyAsync(CancellationToken cancellationToken = default)
        {
            var entities = await _dbContext.Categories
                .AsNoTracking()
                .Include(c => c.ParentCategory)
                    .ThenInclude(pc => pc.ParentCategory)
                .Where(c => c.HasProducts)
                .OrderBy(c => c.Id)
                .ToListAsync(cancellationToken);

            var mappedModels = _mapper.Map<IList<CategoryEntity>, IList<CategoryModel>>(entities);
            return CategoryTransformer.ConvertHierarchy(mappedModels);
        }

        public async Task<IEnumerable<CategoryBreadcrumbModel>?> GetBreadcrumbsAsync(int productId, CancellationToken cancellationToken = default)
        {
            var product = await _dbContext.Products
                .AsNoTracking()
                .Select(p => new { p.Id, p.Title, p.CategoryId })
                .FirstOrDefaultAsync(p => p.Id == productId, cancellationToken);

            if (product == null)
            {
                return null;
            }

            var category = await _dbContext.Categories
                .AsNoTracking()
                .Include(c => c.ParentCategory)
                    .ThenInclude(pc => pc.ParentCategory)
                .FirstOrDefaultAsync(c => c.Id == product.CategoryId, cancellationToken);

            if (category == null)
            {
                return null;
            }

            var mappedCategory = _mapper.Map<CategoryEntity, CategoryModel>(category);
            var crumbs = CategoryTransformer.ConvertToBreadcrumb(mappedCategory).ToList();
            crumbs.Add(new CategoryBreadcrumbModel
            {
                Name = product.Title,
                Url = $"/product/{product.Id}"
            });

            return crumbs;
        }

        public async Task<IEnumerable<CategoryCatalogModel>> GetCatalogAsync(CancellationToken cancellationToken = default)
        {
            var categories = await _dbContext.Categories
                .AsNoTracking()
                .Where(c => c.ParentCategoryId == null || c.ParentCategory.ParentCategoryId == null)
                .Include(c => c.ParentCategory)
                .OrderBy(c => c.Id)
                .ToListAsync(cancellationToken);

            var parentCategories = categories.Where(c => c.ParentCategoryId == null).ToList();
            var childCategories = categories.Where(c => c.ParentCategoryId != null).ToList();

            var mappedCatalog = _mapper.Map<IList<CategoryEntity>, IList<CategoryCatalogModel>>(parentCategories);

            foreach (var category in mappedCatalog)
            {
                var currentCategoryChildren = childCategories
                    .Where(c => c.ParentCategoryId == category.Id)
                    .OrderBy(c => c.Id)
                    .ToList();

                category.SubCategories = _mapper.Map<IList<CategoryEntity>, IList<CategoryCatalogModel>>(currentCategoryChildren);
            }

            return mappedCatalog;
        }

        public async Task<CategoryDetailsModel?> GetCategoryByIdAsync(int categoryId, CancellationToken cancellationToken = default)
        {
            var category = await _dbContext.Categories
                .AsNoTracking()
                .Include(c => c.ParentCategory)
                    .ThenInclude(pc => pc.ParentCategory)
                .FirstOrDefaultAsync(c => c.Id == categoryId, cancellationToken);

            if (category == null)
            {
                return null;
            }

            var children = await _dbContext.Categories
                .AsNoTracking()
                .Where(c => c.ParentCategoryId == categoryId)
                .OrderBy(c => c.Id)
                .Select(c => new CategorySummaryModel
                {
                    Id = c.Id,
                    Name = c.Name
                })
                .ToListAsync(cancellationToken);

            return new CategoryDetailsModel
            {
                Id = category.Id,
                Name = category.Name,
                ImageUrl = category.ImageUrl,
                Parent = MapParent(category.ParentCategory),
                Children = children
            };
        }

        private static CategoryParentModel? MapParent(CategoryEntity? parent)
        {
            if (parent == null)
            {
                return null;
            }

            return new CategoryParentModel
            {
                Id = parent.Id,
                Name = parent.Name,
                Parent = MapParent(parent.ParentCategory)
            };
        }
    }
}
