using System.ComponentModel.DataAnnotations.Schema;

namespace E_Commerce.Models
{
    public class Product
    {
        public int ProductID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public double Rating { get; set; }
        public List<string> ImageList { get; set; } = new List<string>();

        // Foreign Key
        [ForeignKey("SubCategory")]
        public int SubCategory_ID { get; set; }

        // Navigation Property
        public SubCategory SubCategory { get; set; }
    }
}
