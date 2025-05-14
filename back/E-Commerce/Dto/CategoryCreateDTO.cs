namespace E_Commerce.Models
{
    public class CategoryCreateDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public IFormFile? Image { get; set; }
    }
}
