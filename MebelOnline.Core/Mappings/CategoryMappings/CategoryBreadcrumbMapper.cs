using MebelOnline.Core.Models.Categories;
using MebelOnline.Db.Entities;

namespace MebelOnline.Core.Mappings.CategoryMappings
{
    public class CategoryBreadcrumbMapper : IMappingService<CategoryEntity, CategoryBreadcrumbModel>
    {
        public CategoryBreadcrumbModel Map(CategoryEntity source)
        {
            if (source == null)
            {
                return default;
            }

            var model = new CategoryBreadcrumbModel
            {
                Name = source.Name
            };

            return model;
        }
    }
}
