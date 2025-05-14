using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace E_Commerce.Dto
{
    public class ProductCreateDTO
    {
        [Required]
        [StringLength(100, ErrorMessage = "Name cannot be longer than 100 characters.")]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than zero.")]
        public decimal Price { get; set; }

        [Range(0, 5, ErrorMessage = "Rating must be between 0 and 5.")]
        public double Rating { get; set; }

        [Required]
        public string SubCategoryName { get; set; } // The name of the SubCategory to which the product belongs

        // This property will be used to upload an image. The image is optional.
        public List<IFormFile> Images { get; set; }
    }
}
