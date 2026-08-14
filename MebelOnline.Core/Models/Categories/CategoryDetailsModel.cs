namespace MebelOnline.Core.Models.Categories
{
    public class CategoryDetailsModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? ImageUrl { get; set; }
        public CategoryParentModel? Parent { get; set; }
        public IList<CategorySummaryModel> Children { get; set; } = new List<CategorySummaryModel>();
    }
}
