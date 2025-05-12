namespace MebelOnline.Db.Entities
{
    public class CategoryEntity : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int? ParentCategoryId { get; set; }
        public CategoryEntity ParentCategory { get; set; }
        public ICollection<CategoryEntity> SubCategories { get; set; }
        public ICollection<ProductEntity> Products { get; set; }
    }
}
