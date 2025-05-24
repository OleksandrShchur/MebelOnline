using System.ComponentModel.DataAnnotations.Schema;

namespace MebelOnline.Db.Entities
{
    [Table("ProductOptions")]
    public class ProductOptionEntity : BaseEntity
    {
        public int ProductId { get; set; }
        public string ColorName { get; set; }
        public string Material { get; set; }
        public string ImageUrl { get; set; }
    }
}
