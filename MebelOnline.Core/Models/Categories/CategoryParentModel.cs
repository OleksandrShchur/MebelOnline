namespace MebelOnline.Core.Models.Categories
{
    public class CategoryParentModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public CategoryParentModel? Parent { get; set; }
    }
}
