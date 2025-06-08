namespace MebelOnline.Core.Models.Categories
{
    public class CategoryModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public CategoryModel ParentCategory { get; set; }
    }
}
