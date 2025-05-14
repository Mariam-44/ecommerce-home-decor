using E_Commerce.Data;
using E_Commerce.Dto;
using E_Commerce.InterFaces;
using E_Commerce.Models;
using ImageManipulation.Data.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IGenericRepository<SubCategory> _subCategoryRepo;
        private readonly AppDbContext _dbcontext;
        private readonly IGenericRepository<ProductImage> _productImageRepo;
        private readonly IFileService _fileService;

        public ProductController(IGenericRepository<Product> productRepo, IFileService fileService, IGenericRepository<SubCategory> subCategoryRepo, AppDbContext dbcontext, IGenericRepository<ProductImage> productImageRepo)
        {
            _productRepo = productRepo;
            _fileService = fileService;
            _subCategoryRepo = subCategoryRepo;
            _dbcontext = dbcontext;
            _productImageRepo = productImageRepo;
        }

        // GET: api/product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _productRepo.GetAllAsync();
            return Ok(products);
        }

        // GET: api/product/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _productRepo.GetByIdAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Consumes("multipart/form-data")]
        [Produces("application/json")]
        public async Task<ActionResult<Product>> PostProduct([FromForm] ProductCreateDTO productDto)
        {
            if (productDto.Images == null || productDto.Images.Count == 0)
            {
                return BadRequest("At least one image is required.");
            }

            // Fetch SubCategory by Name
            var subCategory = await _dbcontext.SubCategories
                .FirstOrDefaultAsync(sc => sc.Name == productDto.SubCategoryName);

            if (subCategory == null)
            {
                return NotFound($"SubCategory with Name '{productDto.SubCategoryName}' not found.");
            }

            // Save the images to the server and get the file names
            List<string> imagePaths = new List<string>();
            foreach (var image in productDto.Images)
            {
                // Save each image and get the unique file name
                string imagePath = await _fileService.SaveFileAsync(image, new[] { ".jpg", ".jpeg", ".png" });
                imagePaths.Add(imagePath);
            }

            // Create a new product and save it to the database
            var product = new Product
            {
                Name = productDto.Name,
                Description = productDto.Description,
                Price = productDto.Price,
                Rating = productDto.Rating,
                SubCategory_ID = subCategory.SubCategoryID  // Use SubCategoryID from the fetched SubCategory
            };

            // Initialize ImageList if it's not already initialized
            product.ImageList.AddRange(imagePaths);

            var createdProduct = await _productRepo.AddAsync(product);

            // Save images in the ProductImage table, linking each image with the product
            foreach (var path in imagePaths)
            {
                var productImage = new ProductImage
                {
                    ImagePath = path,
                    ProductID = createdProduct.ProductID // Link image to created product
                };

                // Save ProductImage to the ProductImage repository
                await _productImageRepo.AddAsync(productImage);
            }

            return CreatedAtAction(nameof(PostProduct), new { id = createdProduct.ProductID }, createdProduct);
        }


        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, [FromForm] ProductCreateDTO productDto)
        {
            // Validate required fields
            if (string.IsNullOrWhiteSpace(productDto.Name))
            {
                return BadRequest("Product Name is required.");
            }

            if (string.IsNullOrWhiteSpace(productDto.Description))
            {
                return BadRequest("Product Description is required.");
            }

            if (string.IsNullOrWhiteSpace(productDto.SubCategoryName))
            {
                return BadRequest("SubCategory Name is required.");
            }

            // Fetch SubCategory by Name
            var subCategory = await _dbcontext.SubCategories.FirstOrDefaultAsync(sc => sc.Name == productDto.SubCategoryName);
            if (subCategory == null)
            {
                return NotFound($"SubCategory with Name '{productDto.SubCategoryName}' not found.");
            }

            // Validate image size and type
            if (productDto.Images != null)
            {
                foreach (var image in productDto.Images)
                {
                    if (image.Length > 2 * 1024 * 1024)  // Limit image size to 2 MB
                    {
                        return StatusCode(StatusCodes.Status400BadRequest, "File size should not exceed 2 MB");
                    }
                }
            }

            // Fetch the existing Product
            var product = await _productRepo.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            // Save the images to the server and get the file names if new images are provided
            List<string> imagePaths = new List<string>();
            if (productDto.Images != null && productDto.Images.Count > 0)
            {
                foreach (var image in productDto.Images)
                {
                    // Save each image and get the unique file name
                    string imagePath = await _fileService.SaveFileAsync(image, new[] { ".jpg", ".jpeg", ".png" });
                    imagePaths.Add(imagePath);
                }
            }

            // Update the Product with the new values
            product.Name = productDto.Name;
            product.Description = productDto.Description;
            product.Price = productDto.Price;
            product.Rating = productDto.Rating;
            product.SubCategory_ID = subCategory.SubCategoryID; // Assign the resolved SubCategoryID

            // Add new images to ImageList
            if (imagePaths.Count > 0)
            {
                product.ImageList.AddRange(imagePaths);  // Add new images to the existing list
            }

            try
            {
                // Update the Product in the repository
                await _productRepo.UpdateAsync(product);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while updating the product.");
            }

            return NoContent();
        }


        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _productRepo.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            await _productRepo.DeleteAsync(id);
            return NoContent();
        }
    }
}
