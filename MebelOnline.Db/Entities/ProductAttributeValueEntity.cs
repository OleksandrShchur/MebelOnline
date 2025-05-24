using System.ComponentModel.DataAnnotations.Schema;

namespace MebelOnline.Db.Entities
{
    [Table("ProductAttributeValues")]
    public class ProductAttributeValueEntity
    {
        public int ProductId { get; set; }
        public int AttributeId { get; set; }
        public string Value { get; set; }
        public ProductAttributeEntity Attribute { get; set; }
    }
}
