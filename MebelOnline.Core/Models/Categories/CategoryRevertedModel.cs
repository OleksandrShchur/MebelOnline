namespace MebelOnline.Core.Models.Categories
{
    public class CategoryRevertedModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IList<CategoryRevertedModel> ChildrenCategories { get; set; }
    }
}
