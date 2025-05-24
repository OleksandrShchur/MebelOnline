using System.ComponentModel.DataAnnotations.Schema;

namespace MebelOnline.Db.Entities
{
    [Table("Brands")]
    public class BrandEntity : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
    }
}
