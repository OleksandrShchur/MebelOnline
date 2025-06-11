using MebelOnline.Core.Models.Products;
using MebelOnline.Db.Entities;

namespace MebelOnline.Core.Mappings.ProductMappings
{
    public class ProductDetailsModelMapper : IMappingService<ProductEntity, ProductDetailsModel>
    {
        public ProductDetailsModel Map(ProductEntity source)
        {
            if (source == null)
            {
                return default;
            }

            var model = new ProductDetailsModel
            {
                Id = source.Id,
                Title = source.Title,
                Price = source.Price,
                OldPrice = source.OldPrice
            };

            return model;
        }
    }
}
