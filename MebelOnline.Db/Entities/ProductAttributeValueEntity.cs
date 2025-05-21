namespace MebelOnline.Db.Entities
{
    public class ProductAttributeValueEntity
    {
        public int ProductId { get; set; }
        public int AttributeId { get; set; }
        public string Value { get; set; }
        public ProductAttributeEntity Attribute { get; set; }
    }
}
