using System.ComponentModel.DataAnnotations.Schema;

namespace MebelOnline.Db.Entities
{
    [Table("ProductAttributes")]
    public class ProductAttributeEntity : BaseEntity
    {
        public string Name { get; set; }
    }
}
