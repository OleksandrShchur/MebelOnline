using MebelOnline.Core.Models.Categories;
using MebelOnline.Db.Entities;

namespace MebelOnline.Core.Mappings.CategoryMappings
{
    public class CategoryBreadcrumbMapper : IMappingService<CategoryEntity, CategoryBreadcrumb>
    {
        public CategoryBreadcrumb Map(CategoryEntity source)
        {
            return null;
        }

        public IList<CategoryBreadcrumb> MapList(IList<CategoryEntity> source)
        {
            return null;
        }
    }
}
