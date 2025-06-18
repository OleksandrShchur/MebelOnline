using System.ComponentModel.DataAnnotations.Schema;

namespace MebelOnline.Db.Entities
{
    [Table("Products")]
    public class ProductEntity : BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public decimal? OldPrice { get; set; }
        public int CategoryId { get; set; }
        public decimal? Width { get; set; }
        public decimal? Height { get; set; }
        public decimal? Depth { get; set; }
        public int? BrandId { get; set; }
        public string Note { get; set; }
        public BrandEntity Brand { get; set; }
        public virtual ICollection<ProductOptionEntity> Options { get; set; }
        public virtual ICollection<ProductImageEntity> Images { get; set; }
        public virtual ICollection<ProductAttributeValueEntity> Attributes { get; set; }
    }
}
