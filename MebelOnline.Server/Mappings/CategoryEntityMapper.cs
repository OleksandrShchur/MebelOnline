using MebelOnline.Db.Entities;
using MebelOnline.Server.Models;

namespace MebelOnline.Server.Mappings
{
    public class CategoryEntityMapper : IMappingService<CategoryEntity, CategoryModel>
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
                Description = source.Description,
                ParentCategoryId = source.ParentCategoryId,
                ParentCategory = source.ParentCategory != null 
                    ? Map(source.ParentCategory) 
                    : null
            };

            return model;
        }


        public IList<CategoryModel> MapList(IList<CategoryEntity> source)
        {
            if (source == null)
            {
                return new List<CategoryModel>();
            }

            var mappedList = new List<CategoryModel>();
            foreach (var item in source)
            {
                mappedList.Add(Map(item));
            }

            return mappedList;
        }
    }
}
