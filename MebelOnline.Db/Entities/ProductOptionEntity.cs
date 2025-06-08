using System.ComponentModel.DataAnnotations.Schema;
using MebelOnline.Db.Enums;

namespace MebelOnline.Db.Entities
{
    [Table("ProductOptions")]
    public class ProductOptionEntity : BaseEntity
    {
        public int ProductId { get; set; }
        public string ColorName { get; set; }
        public ProductOptionTypeEnum OptionType { get; set; }
        public string ImageUrl { get; set; }
    }
}
