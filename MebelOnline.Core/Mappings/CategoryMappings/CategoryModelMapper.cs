using MebelOnline.Db.Entities;
using MebelOnline.Core.Models.Categories;

namespace MebelOnline.Core.Mappings.CategoryMappings
{
    public class CategoryModelMapper : IMappingService<CategoryEntity, CategoryModel>
    {
        public CategoryModel Map(CategoryEntity source)
        {
            if (source == null)
            {
                return default;
            }

            var model = new CategoryModel
            {
                Id = source.Id,
                Name = source.Name,
                ParentCategory = source.ParentCategory != null
                    ? Map(source.ParentCategory)
                    : null
            };

            return model;
        }
    }
}
