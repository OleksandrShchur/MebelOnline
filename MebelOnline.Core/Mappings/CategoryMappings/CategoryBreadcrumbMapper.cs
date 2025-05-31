using MebelOnline.Core.Models.Categories;
using MebelOnline.Db.Entities;

namespace MebelOnline.Core.Mappings.CategoryMappings
{
    public class CategoryBreadcrumbMapper : IMappingService<CategoryEntity, CategoryBreadcrumb>
    {
        public CategoryBreadcrumb Map(CategoryEntity source)
        {
            if (source == null)
            {
                return default;
            }

            var model = new CategoryBreadcrumb
            {
                Id = source.Id,
                Name = source.Name,
                //ParentCategory = source.ParentCategory != null
                //    ? Map(source.ParentCategory)
                //    : null
            };

            return model;
        }

        public IList<CategoryBreadcrumb> MapList(IList<CategoryEntity> source)
        {
            if (source == null)
            {
                return new List<CategoryBreadcrumb>();
            }

            var mappedList = new List<CategoryBreadcrumb>();
            foreach (var item in source)
            {
                mappedList.Add(Map(item));
            }

            return mappedList;
        }
    }
}
