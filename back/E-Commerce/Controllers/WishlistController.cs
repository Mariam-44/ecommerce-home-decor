using E_Commerce.Data;
using E_Commerce.Dto;
using E_Commerce.InterFaces;
using E_Commerce.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishlistController : ControllerBase
    {
        private readonly IGenericRepository<Wishlist> _wishlistRepo;
        private readonly IGenericRepository<WishlistItem> _wishlistItemRepo;
        private readonly IGenericRepository<Product> _productRepo;
        private readonly AppDbContext _context;

        public WishlistController(IGenericRepository<Wishlist> wishlistRepo, IGenericRepository<WishlistItem> wishlistItemRepo, IGenericRepository<Product> productRepo, AppDbContext context)
        {
            _wishlistRepo = wishlistRepo;
            _wishlistItemRepo = wishlistItemRepo;
            _productRepo = productRepo;
            _context = context;
        }

        // GET: api/wishlist/GetWishlistProducts
        [HttpGet("GetWishlistProducts")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetWishlistProducts(string userId)
        {
            // Get user's wishlist
            var wishlist = await _context.Wishlists
                .Include(w => w.WishlistItems)
                .ThenInclude(wi => wi.Product) // Include product details
                .FirstOrDefaultAsync(w => w.User_Id == userId);

            if (wishlist == null)
            {
                return NotFound(new { message = "Wishlist not found" });
            }

            // Retrieve wishlist products
            var wishlistProducts = wishlist.WishlistItems.Select(wi => new
            {
                ProductId = wi.ProductID,
                ProductName = wi.Product.Name,
                Price = wi.Product.Price
            }).ToList();

            return Ok(wishlistProducts);
        }

        // POST: api/wishlist/AddToWishlist
        [HttpPost("AddToWishlist")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> AddToWishlist([FromBody] AddToWishlistDTO addToWishlistDto)
        {
            // Validate product existence
            var product = await _productRepo.GetByIdAsync(addToWishlistDto.ProductId);
            if (product == null)
            {
                return NotFound(new { message = "Product not found" });
            }

            // Get or create wishlist for the user
            var wishlist = await _context.Wishlists
                .Include(w => w.WishlistItems)
                .FirstOrDefaultAsync(w => w.User_Id == addToWishlistDto.UserId);

            if (wishlist == null)
            {
                wishlist = new Wishlist
                {
                    User_Id = addToWishlistDto.UserId,
                    WishlistItems = new List<WishlistItem>()
                };
                await _wishlistRepo.AddAsync(wishlist);
            }

            // Check if the product is already in the wishlist
            if (wishlist.WishlistItems.Any(wi => wi.ProductID == addToWishlistDto.ProductId))
            {
                return BadRequest(new { message = "Product already exists in wishlist" });
            }

            // Add product to wishlist
            var wishlistItem = new WishlistItem
            {
                ProductID = addToWishlistDto.ProductId,
                WishlistID = wishlist.WishlistID
            };
            wishlist.WishlistItems.Add(wishlistItem);

            // Save changes
            await _context.SaveChangesAsync();

            return Ok(new { message = "Product added to wishlist successfully" });
        }

        // DELETE: api/wishlist/RemoveFromWishlist
        [HttpDelete("RemoveFromWishlist")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> RemoveFromWishlist(int productId, string userId)
        {
            // Get user's wishlist
            var wishlist = await _context.Wishlists
                .Include(w => w.WishlistItems)
                .FirstOrDefaultAsync(w => w.User_Id == userId);

            if (wishlist == null)
            {
                return NotFound(new { message = "Wishlist not found" });
            }

            // Find the wishlist item to remove
            var wishlistItem = wishlist.WishlistItems.FirstOrDefault(wi => wi.ProductID == productId);
            if (wishlistItem == null)
            {
                return NotFound(new { message = "Product not found in wishlist" });
            }

            // Remove the wishlist item
            await _wishlistItemRepo.DeleteAsync(wishlistItem.WishlistItemID);

            // Save changes
            await _context.SaveChangesAsync();

            return Ok(new { message = "Product removed from wishlist successfully" });
        }
    }
}
