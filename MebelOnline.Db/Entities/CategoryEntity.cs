using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MebelOnline.Db.Entities
{
    [Table("Categories")]
    public class CategoryEntity : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int? ParentCategoryId { get; set; }
        public bool HasProducts { get; set; }

        public virtual CategoryEntity ParentCategory { get; set; }
    }
}
