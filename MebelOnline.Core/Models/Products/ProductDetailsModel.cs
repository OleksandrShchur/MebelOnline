namespace MebelOnline.Core.Models.Products
{
    public class ProductDetailsModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public decimal? OldPrice { get; set; }
        public decimal? Width { get; set; }
        public decimal? Height { get; set; }
        public decimal? Depth { get; set; }
        public string BrandName { get; set; }
        public string BrandDescription { get; set; }

    }
}
