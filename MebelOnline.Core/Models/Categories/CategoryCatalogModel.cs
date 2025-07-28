namespace MebelOnline.Core.Models.Categories
{
    public class CategoryCatalogModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public IList<CategoryCatalogModel> SubCategories { get; set; }
    }
}
