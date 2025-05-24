using System.ComponentModel.DataAnnotations.Schema;

namespace MebelOnline.Db.Entities
{
    [Table("ProductImages")]
    public class ProductImageEntity : BaseEntity
    {
        public int ProductId { get; set; }
        public string Url { get; set; }
        public bool IsPrimary { get; set; }
    }
}
