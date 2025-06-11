using MebelOnline.Core.Models.ProductOptions;
using MebelOnline.Db.Entities;

namespace MebelOnline.Core.Mappings.ProductOptionMappings
{
    public class ProductOptionModelMapper : IMappingService<ProductOptionEntity, ProductOptionModel>
    {
        public ProductOptionModel Map(ProductOptionEntity source)
        {
            if (source == null)
            {
                return default;
            }

            var model = new ProductOptionModel
            {
                ColorName = source.ColorName,
                ImageUrl = source.ImageUrl
            };

            return model;
        }
    }
}
