namespace MebelOnline.Server.Models.Products
{
    public class ProductModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public string ImageUrl { get; set; }
        public DateTime DateAdded { get; set; }
        public int CategoryId { get; set; }
    }
}
