using MebelOnline.Db.Entities;
using MebelOnline.Core.Models.Products;

namespace MebelOnline.Core.Mappings.ProductMappings
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
                ImageUrl = source.Images.FirstOrDefault(i => i.IsPrimary).Url
            };

            return model;
        }
    }
}
