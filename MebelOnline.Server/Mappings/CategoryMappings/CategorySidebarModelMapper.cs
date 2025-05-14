using MebelOnline.Db.Entities;
using MebelOnline.Server.Models;

namespace MebelOnline.Server.Mappings.CategoryMappings
{
    public class CategorySidebarModelMapper : IMappingService<CategoryEntity, CategorySidebarModel>
    {
        public CategorySidebarModel Map(CategoryEntity source)
        {
            if (source == null)
            {
                return default;
            }

            var model = new CategorySidebarModel
            {
                Id = source.Id,
                Name = source.Name,
                ParentCategory = source.ParentCategory != null
                    ? Map(source.ParentCategory)
                    : null
            };

            return model;
        }


        public IList<CategorySidebarModel> MapList(IList<CategoryEntity> source)
        {
            if (source == null)
            {
                return new List<CategorySidebarModel>();
            }

            var mappedList = new List<CategorySidebarModel>();
            foreach (var item in source)
            {
                mappedList.Add(Map(item));
            }

            return mappedList;
        }
    }
}
