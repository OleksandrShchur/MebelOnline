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

            var entity = source;

            var model = new CategoryModel
            {
                Id = entity.Id,
                Name = entity.Name,
                Description = entity.Description,
                ParentCategoryId = entity.ParentCategoryId,
                ParentCategory = entity.ParentCategory != null 
                    ? Map(entity.ParentCategory) 
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
