using System.ComponentModel.DataAnnotations.Schema;

namespace MebelOnline.Db.Entities
{
    [Table("ProductAtributes")]
    public class ProductAttributeEntity : BaseEntity
    {
        public string Name { get; set; }
    }
}
