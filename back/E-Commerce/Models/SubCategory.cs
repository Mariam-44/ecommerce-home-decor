using System.ComponentModel.DataAnnotations.Schema;

namespace E_Commerce.Models
{
    public class SubCategory
    {
        public int SubCategoryID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }

        // Foreign Key
        [ForeignKey("Category")]

        public int CategoryID { get; set; }

        // Navigation Properties
        public Category Category { get; set; }
        public ICollection<Product> Products { get; set; }
    }
}
