namespace MebelOnline.Server.Models
{
    public class CategoryModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? ParentCategoryId { get; set; }
        public virtual CategoryModel ParentCategory { get; set; }
    }
}
