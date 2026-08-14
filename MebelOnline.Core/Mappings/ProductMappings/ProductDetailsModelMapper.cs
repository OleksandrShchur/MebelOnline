using MebelOnline.Core.Models.Brands;
using MebelOnline.Core.Models.Categories;
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

            var options = source.Options ?? Enumerable.Empty<ProductOptionEntity>();

            return new ProductDetailsModel
            {
                Id = source.Id,
                Title = source.Title,
                Description = source.Description,
                Price = source.Price,
                OldPrice = source.OldPrice,
                Width = source.Width,
                Height = source.Height,
                Depth = source.Depth,
                Note = source.Note,
                Brand = source.Brand == null
                    ? null
                    : new BrandModel
                    {
                        Name = source.Brand.Name,
                        Description = source.Brand.Description
                    },
                Category = source.Category == null
                    ? null
                    : new CategorySummaryModel
                    {
                        Id = source.Category.Id,
                        Name = source.Category.Name
                    },
                FrontOptions = MapOptions(options, ProductOptionTypeEnum.Front),
                FrameOptions = MapOptions(options, ProductOptionTypeEnum.Frame),
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
                        .Where(a => a.Attribute != null)
                        .Select(a => new ProductAttributeValueModel
                        {
                            Key = a.Attribute.Name,
                            Value = a.Value
                        }).ToList()
                    : new List<ProductAttributeValueModel>()
            };
        }

        private static IList<ProductOptionModel> MapOptions(
            IEnumerable<ProductOptionEntity> options,
            ProductOptionTypeEnum optionType)
        {
            return options
                .Where(o => o.OptionType == optionType)
                .Select(o => new ProductOptionModel
                {
                    ColorName = o.ColorName,
                    Material = o.Material,
                    ImageUrl = o.ImageUrl
                })
                .ToList();
        }
    }
}
