namespace E_Commerce.Models
{
    public class ProductImage
    {
        public int ProductImageID { get; set; }
        public string ImagePath { get; set; }
        public int ProductID { get; set; }  // Foreign Key to Product

        // Navigation Property
        public Product Product { get; set; }
    }
}
