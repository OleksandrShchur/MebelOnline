using MebelOnline.Core.Models.Products;
using MebelOnline.Db.Entities;

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

            var images = source.Images ?? Enumerable.Empty<ProductImageEntity>();
            var primary = images.FirstOrDefault(i => i.IsPrimary) ?? images.FirstOrDefault();

            return new ProductCardModel
            {
                Id = source.Id,
                Title = source.Title,
                Price = source.Price,
                OldPrice = source.OldPrice,
                ImageUrl = primary?.Url
            };
        }
    }
}
