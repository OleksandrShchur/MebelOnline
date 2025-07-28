using MebelOnline.Core.Models.Categories;
using MebelOnline.Db.Entities;

namespace MebelOnline.Core.Mappings.CategoryMappings
{
    public class CategoryCatalogModelMapper : IMappingService<CategoryEntity, CategoryCatalogModel>
    {
        public CategoryCatalogModel Map(CategoryEntity source)
        {
            if (source == null)
            {
                return default;
            }

            var model = new CategoryCatalogModel
            {
                Id = source.Id,
                Name = source.Name,
                ImageUrl = source.ImageUrl
            };

            return model;
        }
    }
}
