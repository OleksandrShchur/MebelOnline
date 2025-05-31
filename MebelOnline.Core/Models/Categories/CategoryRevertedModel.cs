namespace MebelOnline.Core.Models.Categories
{
    public class CategorySidebarRevertedModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IList<CategorySidebarRevertedModel> ChildrenCategories { get; set; }
    }
}
