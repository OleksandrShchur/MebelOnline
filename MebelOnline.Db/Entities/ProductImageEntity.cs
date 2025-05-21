namespace MebelOnline.Db.Entities
{
    public class ProductImageEntity : BaseEntity
    {
        public int ProductId { get; set; }
        public string Url { get; set; }
        public bool IsPrimary { get; set; }
    }
}
