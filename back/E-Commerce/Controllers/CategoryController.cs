using E_Commerce.Models;
using E_Commerce.InterFaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using ImageManipulation.Data.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;

namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IGenericRepository<Category> _categoryRepo;
        private readonly IFileService _fileService;


        public CategoryController(IGenericRepository<Category> categoryRepo , IFileService fileService)
        {
            _categoryRepo = categoryRepo;
            _fileService = fileService;
        }

        // GET: api/category
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            var categories = await _categoryRepo.GetAllAsync();
            return Ok(categories);
        }

        // GET: api/category/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            var category = await _categoryRepo.GetByIdAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory([FromForm] CategoryCreateDTO categoryDto)
        {
            if (categoryDto.Image?.Length > 1 * 1024 * 1024)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "File size should not exceed 1 MB");
            }

            string[] allowedFileExtensions = { ".jpg", ".jpeg", ".png" };

            string createdImageName = await _fileService.SaveFileAsync(categoryDto.Image, allowedFileExtensions);

            var category = new Category
            {
                Name = categoryDto.Name,
                Description = categoryDto.Description,
                Image = createdImageName
            };

            var createdCategory = await _categoryRepo.AddAsync(category);

            return CreatedAtAction(nameof(GetCategory), new { id = createdCategory.CategoryID }, createdCategory);
        }

        // PUT: api/category/5
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, [FromForm] CategoryCreateDTO categoryDto)
        {

            if (categoryDto.Image?.Length > 1 * 1024 * 1024)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "File size should not exceed 1 MB");
            }
            string[] allowedFileExtensions = { ".jpg", ".jpeg", ".png" };
            string createdImageName = null;
            if (categoryDto.Image != null)
            {
                createdImageName = await _fileService.SaveFileAsync(categoryDto.Image, allowedFileExtensions);
            }
                var category = await _categoryRepo.GetByIdAsync(id);
            if (category == null)
            {
                return NotFound();
            }
            category.Name = categoryDto.Name;
            category.Description = categoryDto.Description;
            if (createdImageName != null)
            {
                category.Image = createdImageName;
            }
            try
            {
                await _categoryRepo.UpdateAsync(category);
            }
            catch
            {
                throw;
            }
            return NoContent();
        }


        // DELETE: api/category/5
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _categoryRepo.GetByIdAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            await _categoryRepo.DeleteAsync(id);
            return NoContent();
        }
    }
}
