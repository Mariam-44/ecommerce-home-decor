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
    public class SubCategoryController : ControllerBase
    {
        private readonly IGenericRepository<SubCategory> _subCategoryRepo;
        private readonly IGenericRepository<Category> _categoryRepo;
        private readonly AppDbContext _dbcontext;

        private readonly IFileService _fileService;

        public SubCategoryController(IGenericRepository<SubCategory> subCategoryRepo, IFileService fileService, IGenericRepository<Category> categoryRepo,AppDbContext dbcontext)
        {
            _subCategoryRepo = subCategoryRepo;
            _fileService = fileService;
            _categoryRepo = categoryRepo;
            _dbcontext = dbcontext;
        }

        // GET: api/subcategory
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubCategory>>> GetSubCategories()
        {
            var subCategories = await _subCategoryRepo.GetAllAsync();
            return Ok(subCategories);
        }

        // GET: api/subcategory/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SubCategory>> GetSubCategory(int id)
        {
            var subCategory = await _subCategoryRepo.GetByIdAsync(id);

            if (subCategory == null)
            {
                return NotFound();
            }

            return Ok(subCategory);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<SubCategory>> PostSubCategory([FromForm] SubCategoryCreateDTO subCategoryDto)
        {
            // Validate required fields
            if (string.IsNullOrWhiteSpace(subCategoryDto.Name))
            {
                return BadRequest("SubCategory Name is required.");
            }

            if (string.IsNullOrWhiteSpace(subCategoryDto.Description))
            {
                return BadRequest("SubCategory Description is required.");
            }

            if (string.IsNullOrWhiteSpace(subCategoryDto.CategoryName))
            {
                return BadRequest("Category Name is required.");
            }

            // Fetch Category by Name
            var category = await _dbcontext.Categories.FirstOrDefaultAsync(c => c.Name == subCategoryDto.CategoryName);
            if (category == null)
            {
                return NotFound($"Category with Name '{subCategoryDto.CategoryName}' not found.");
            }

            // Validate image size and type
            if (subCategoryDto.Image?.Length > 1 * 1024 * 1024)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "File size should not exceed 1 MB");
            }

            string[] allowedFileExtensions = { ".jpg", ".jpeg", ".png" };
            string createdImageName = null;

            if (subCategoryDto.Image != null)
            {
                createdImageName = await _fileService.SaveFileAsync(subCategoryDto.Image, allowedFileExtensions);
            }

            // Create the SubCategory
            var subCategory = new SubCategory
            {
                Name = subCategoryDto.Name,
                Description = subCategoryDto.Description,
                Image = createdImageName,
                CategoryID = category.CategoryID // Assign the resolved CategoryID
            };

            var createdSubCategory = await _subCategoryRepo.AddAsync(subCategory);

            return CreatedAtAction(nameof(GetSubCategory), new { id = createdSubCategory.SubCategoryID }, createdSubCategory);
        }



        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubCategory(int id, [FromForm] SubCategoryCreateDTO subCategoryDto)
        {
            // Validate required fields
            if (string.IsNullOrWhiteSpace(subCategoryDto.Name))
            {
                return BadRequest("SubCategory Name is required.");
            }

            if (string.IsNullOrWhiteSpace(subCategoryDto.Description))
            {
                return BadRequest("SubCategory Description is required.");
            }

            if (string.IsNullOrWhiteSpace(subCategoryDto.CategoryName))
            {
                return BadRequest("Category Name is required.");
            }

            // Fetch Category by Name
            var category = await _dbcontext.Categories.FirstOrDefaultAsync(c => c.Name == subCategoryDto.CategoryName);
            if (category == null)
            {
                return NotFound($"Category with Name '{subCategoryDto.CategoryName}' not found.");
            }

            // Validate image size and type
            if (subCategoryDto.Image?.Length > 1 * 1024 * 1024)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "File size should not exceed 1 MB");
            }

            string[] allowedFileExtensions = { ".jpg", ".jpeg", ".png" };
            string createdImageName = null;

            if (subCategoryDto.Image != null)
            {
                createdImageName = await _fileService.SaveFileAsync(subCategoryDto.Image, allowedFileExtensions);
            }

            // Fetch the existing SubCategory
            var subCategory = await _subCategoryRepo.GetByIdAsync(id);
            if (subCategory == null)
            {
                return NotFound();
            }

            // Update the SubCategory with the new values
            subCategory.Name = subCategoryDto.Name;
            subCategory.Description = subCategoryDto.Description;
            subCategory.CategoryID = category.CategoryID; // Assign the resolved CategoryID

            if (createdImageName != null)
            {
                subCategory.Image = createdImageName; // Update image if a new one is provided
            }

            try
            {
                // Update the SubCategory in the repository
                await _subCategoryRepo.UpdateAsync(subCategory);
            }
            catch
            {
                throw;
            }

            return NoContent();
        }


        // DELETE: api/subcategory/5
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubCategory(int id)
        {
            var subCategory = await _subCategoryRepo.GetByIdAsync(id);
            if (subCategory == null)
            {
                return NotFound();
            }

            await _subCategoryRepo.DeleteAsync(id);
            return NoContent();
        }
    }
}
