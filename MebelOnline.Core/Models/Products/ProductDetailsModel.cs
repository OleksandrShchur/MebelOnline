using MebelOnline.Core.Models.Brands;
using MebelOnline.Core.Models.ProductAttributeValues;
using MebelOnline.Core.Models.ProductImages;
using MebelOnline.Core.Models.ProductOptions;

namespace MebelOnline.Core.Models.Products
{
    public class ProductDetailsModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public decimal? OldPrice { get; set; }
        public decimal? Width { get; set; }
        public decimal? Height { get; set; }
        public decimal? Depth { get; set; }
        public BrandModel Brand { get; set; }
        public IList<ProductOptionModel> FrontOptions { get; set; }
        public IList<ProductOptionModel> FrameOptions { get; set; }
        public IList<ProductImageModel> Images { get; set; }
        public IList<ProductAttributeValueModel> Attributes { get; set; }
    }
}
