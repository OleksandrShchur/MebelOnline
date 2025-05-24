using MebelOnline.Db.Entities;
using MebelOnline.Server.Models.Products;

namespace MebelOnline.Server.Mappings.ProductMappings
{
    public class ProductCardModelMapper : IMappingService<ProductEntity, ProductCardModel>
    {
        public ProductCardModel Map(ProductEntity source)
        {
            if (source == null)
            {
                return default;
            }

            var model = new ProductCardModel
            {
                Id = source.Id,
                Title = source.Title,
                Price = source.Price,
                OldPrice = source.OldPrice,
                ImageUrl = source.Images.FirstOrDefault(x => x.IsPrimary).Url
            };

            return model;
        }

        public IList<ProductCardModel> MapList(IList<ProductEntity> source)
        {
            if (source == null)
            {
                return new List<ProductCardModel>();
            }

            var mappedList = new List<ProductCardModel>();
            foreach (var item in source)
            {
                mappedList.Add(Map(item));
            }

            return mappedList;
        }
    }
}
