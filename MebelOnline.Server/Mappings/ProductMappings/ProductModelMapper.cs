using MebelOnline.Db.Entities;
using MebelOnline.Server.Models;

namespace MebelOnline.Server.Mappings.ProductMappings
{
    public class ProductModelMapper : IMappingService<ProductEntity, ProductModel>
    {
        public ProductModel Map(ProductEntity source)
        {
            if (source == null)
            {
                return default;
            }

            var model = new ProductModel
            {
                Id = source.Id,
                Name = source.Name,
                Description = source.Description,
                Price = source.Price,
                StockQuantity = source.StockQuantity,
                ImageUrl = source.ImageUrl,
                DateAdded = source.DateAdded,
                CategoryId = source.CategoryId
            };

            return model;
        }

        public IList<ProductModel> MapList(IList<ProductEntity> source)
        {
            if (source == null)
            {
                return new List<ProductModel>();
            }

            var mappedList = new List<ProductModel>();
            foreach (var item in source)
            {
                mappedList.Add(Map(item));
            }

            return mappedList;
        }
    }
}
