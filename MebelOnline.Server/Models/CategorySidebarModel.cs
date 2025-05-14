namespace MebelOnline.Server.Models
{
    public class CategorySidebarModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public CategorySidebarModel ParentCategory { get; set; }
    }
}
