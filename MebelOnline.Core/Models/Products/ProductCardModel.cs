namespace MebelOnline.Core.Models.Products
{
    public class ProductCardModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
        public decimal? OldPrice { get; set; }
        public string ImageUrl { get; set; }
    }
}
