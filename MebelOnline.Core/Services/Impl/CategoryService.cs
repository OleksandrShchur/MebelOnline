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
        private readonly IMappingService<CategoryEntity, CategorySidebarModel> _mapper;

        public CategoryService(AppDbContext dbContext, IMappingService<CategoryEntity, CategorySidebarModel> mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CategorySidebarRevertedModel>> GetCategoriesForSidebar()
        {
            var entities = await _dbContext.Categories
                            .Include(c => c.ParentCategory)
                                .ThenInclude(pc => pc.ParentCategory)
                            .Where(c => c.HasProducts)
                            .OrderBy(c => c.Id)
                            .ToListAsync();

            var mappedModels = _mapper.MapList(entities);
            var revertedModels = CategorySidebarTransformer.ConvertHierarchy(mappedModels);

            return revertedModels;
        }
    }
}
