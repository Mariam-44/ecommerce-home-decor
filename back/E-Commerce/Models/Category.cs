namespace E_Commerce.Models
{
    public class Category
    {
        public int CategoryID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }

        // Navigation Property
        public ICollection<SubCategory> SubCategories { get; set; }
    }
}
