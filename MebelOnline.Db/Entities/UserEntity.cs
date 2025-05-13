using System.ComponentModel.DataAnnotations.Schema;

namespace MebelOnline.Db.Entities
{
    [Table("Users")]
    public class UserEntity : BaseEntity
    {
        public string PasswordHash { get; set; }
    }
}
