using MebelOnline.Core.Models.Brands;
using MebelOnline.Core.Models.ProductAttributeValues;
using MebelOnline.Core.Models.ProductImages;
using MebelOnline.Core.Models.ProductOptions;
using MebelOnline.Core.Models.Products;
using MebelOnline.Db.Entities;
using MebelOnline.Db.Enums;

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
                Description = source.Description,
                Price = source.Price,
                OldPrice = source.OldPrice,
                Width = source.Width,
                Height = source.Height,
                Depth = source.Depth,
                Brand = new BrandModel
                {
                    Name = source.Brand?.Name,
                    Description = source.Brand?.Description
                },
                FrontOptions = source.Options != null 
                    ? source.Options
                        .Where(o => o.OptionType == ProductOptionTypeEnum.Front)
                        .Select(o => new ProductOptionModel
                        {
                            ColorName = o.ColorName,
                            ImageUrl = o.ImageUrl
                        }).ToList()
                    : new List<ProductOptionModel>(),
                FrameOptions = source.Options != null
                    ? source.Options
                        .Where(o => o.OptionType == ProductOptionTypeEnum.Frame)
                        .Select(o => new ProductOptionModel
                        {
                            ColorName = o.ColorName,
                            ImageUrl = o.ImageUrl
                        }).ToList()
                    : new List<ProductOptionModel>(),
                Images = source.Images != null
                    ? source.Images
                        .Select(i => new ProductImageModel
                        {
                            Url = i.Url,
                            IsPrimary = i.IsPrimary
                        }).ToList()
                    : new List<ProductImageModel>(),
                Attributes = source.Attributes != null
                    ? source.Attributes
                        .Select(a => new ProductAttributeValueModel
                        {
                            Key = a.Attribute.Name,
                            Value = a.Value
                        }).ToList()
                    : new List<ProductAttributeValueModel>()
            };

            return model;
        }
    }
}
