namespace E_Commerce.Dto
{
    public class SubCategoryCreateDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public IFormFile Image { get; set; }
        public string CategoryName { get; set; }
    }
}
