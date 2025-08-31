namespace MebelOnline.Core.Models.Search
{
    public class SearchSidebarModel
    {
        public decimal MinPrice { get; set; }
        public decimal MaxPrice { get; set; }
        public IList<string> Brands { get; set; }
        public IList<string> Materials { get; set; }
    }
}
