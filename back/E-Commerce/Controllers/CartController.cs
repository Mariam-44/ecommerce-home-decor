using E_Commerce.Data;
using E_Commerce.Dto;
using E_Commerce.InterFaces;
using E_Commerce.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly IGenericRepository<Cart> _cartRepo;
        private readonly IGenericRepository<CartItem> _cartItemRepo;
        private readonly IGenericRepository<Product> _productRepo;
        private readonly AppDbContext _context;

        public CartController(IGenericRepository<Cart> cartRepo, IGenericRepository<CartItem> cartItemRepo, IGenericRepository<Product> productRepo, AppDbContext context)
        {
            _cartRepo = cartRepo;
            _cartItemRepo = cartItemRepo;
            _productRepo = productRepo;
            _context = context;
        }

        // GET: api/cart/GetCartProducts

        [HttpGet("GetCartProducts")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetCartProducts(string userId)
        {
            // Get user's cart
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product) // Include the product details for each cart item
                .FirstOrDefaultAsync(c => c.User_Id == userId);

            if (cart == null)
            {
                return NotFound(new { message = "Cart not found" });
            }

            // Get all products in the cart
            var cartProducts = cart.CartItems.Select(ci => new
            {
                ProductId = ci.ProductID,
                ProductName = ci.Product.Name,
                Quantity = ci.Quantity,
                Price = ci.Product.Price,
                TotalPrice = ci.Quantity * ci.Product.Price
            }).ToList();

            // Calculate total number of distinct products in the cart
            int totalItems = cart.CartItems.Count;

            return Ok(new
            {
                CartProducts = cartProducts,
                TotalItems = totalItems
            });
        }




        // POST: api/cart/AddToCart
        [HttpPost("AddToCart")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> AddToCart([FromBody] AddToCartDTO addToCartDto)
        {
            // Validate product existence
            var product = await _productRepo.GetByIdAsync(addToCartDto.ProductId);
            if (product == null)
            {
                return NotFound(new { message = "Product not found" });
            }

            // Get or create cart for the user
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.User_Id == addToCartDto.UserId);

            if (cart == null)
            {
                cart = new Cart
                {
                    User_Id = addToCartDto.UserId,
                    CartItems = new List<CartItem>(),
                    ProductCount = 0,
                    TotalPrice = 0
                };
                await _cartRepo.AddAsync(cart);
            }

            // Check if the product is already in the cart
            var cartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductID == addToCartDto.ProductId);

            if (cartItem != null)
            {
                // Update quantity
                cartItem.Quantity += addToCartDto.Quantity;
            }
            else
            {
                // Add new cart item
                cartItem = new CartItem
                {
                    ProductID = addToCartDto.ProductId,
                    Quantity = addToCartDto.Quantity,
                    CartID = cart.CartID
                };
                cart.CartItems.Add(cartItem);
            }

            // Update cart totals
            cart.ProductCount += addToCartDto.Quantity;
            cart.TotalPrice += product.Price * addToCartDto.Quantity;

            // Save changes
            await _context.SaveChangesAsync();

            return Ok(new { message = "Product added to cart successfully" });
        }

        [HttpDelete("RemoveFromCart")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> RemoveFromCart(int productId, string userId)
        {
            // Get user's cart
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product)  // Make sure product details are loaded
                .FirstOrDefaultAsync(c => c.User_Id == userId);

            if (cart == null)
            {
                return NotFound(new { message = "Cart not found" });
            }

            // Ensure that CartItems is not null
            if (cart.CartItems == null || !cart.CartItems.Any())
            {
                return NotFound(new { message = "No items in the cart" });
            }

            // Find the cart item to remove
            var cartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductID == productId);
            if (cartItem == null)
            {
                return NotFound(new { message = "Product not found in cart" });
            }

            // Ensure Product is not null
            if (cartItem.Product == null)
            {
                return NotFound(new { message = "Product not found for the cart item" });
            }

            // Update cart totals
            cart.ProductCount -= cartItem.Quantity;
            cart.TotalPrice -= cartItem.Quantity * cartItem.Product.Price;

            // Remove the cart item
            await _cartItemRepo.DeleteAsync(cartItem.CartItemID);  // Ensure CartItemID is valid

            // Save changes
            await _context.SaveChangesAsync();

            return Ok(new { message = "Product removed from cart successfully" });
        }

        

        [HttpPut("EditCartItemQuantity")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> EditCartItemQuantity([FromBody] EditCartItemQuantityDTO editDto)
        {
            // Validate input
            if (editDto.Quantity <= 0)
            {
                return BadRequest(new { message = "Quantity must be greater than zero" });
            }

            // Get user's cart
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product)
                .FirstOrDefaultAsync(c => c.User_Id == editDto.UserId);

            if (cart == null)
            {
                return NotFound(new { message = "Cart not found" });
            }

            // Find the cart item to update
            var cartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductID == editDto.ProductId);
            if (cartItem == null)
            {
                return NotFound(new { message = "Product not found in cart" });
            }

            // Ensure Product is not null
            if (cartItem.Product == null)
            {
                return NotFound(new { message = "Product details are missing" });
            }

            // Update cart totals before changing quantity
            cart.TotalPrice -= cartItem.Quantity * cartItem.Product.Price;
            cart.ProductCount -= cartItem.Quantity;

            // Update the quantity
            cartItem.Quantity = editDto.Quantity;

            // Recalculate cart totals
            cart.TotalPrice += cartItem.Quantity * cartItem.Product.Price;
            cart.ProductCount += cartItem.Quantity;

            // Save changes
            await _context.SaveChangesAsync();

            return Ok(new { message = "Cart item quantity updated successfully" });
        }


        [HttpPost("CheckoutProduct")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> CheckoutProduct([FromBody] CheckoutProductDTO checkoutDto)
        {
            // Validate input
            if (string.IsNullOrWhiteSpace(checkoutDto.UserId) ||
                checkoutDto.ProductId <= 0 ||
                string.IsNullOrWhiteSpace(checkoutDto.CardNumber) ||
                string.IsNullOrWhiteSpace(checkoutDto.ExpiryDate) ||
                string.IsNullOrWhiteSpace(checkoutDto.CVV))
            {
                return BadRequest(new { message = "Invalid input" });
            }

            // Retrieve the user's cart
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product) // Include product details
                .FirstOrDefaultAsync(c => c.User_Id == checkoutDto.UserId);

            if (cart == null || !cart.CartItems.Any())
            {
                return BadRequest(new { message = "Your cart is empty" });
            }

            // Find the specific product in the cart
            var cartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductID == checkoutDto.ProductId);
            if (cartItem == null)
            {
                return NotFound(new { message = "Product not found in cart" });
            }

            // Get product details
            var product = cartItem.Product;
            if (product == null)
            {
                return NotFound(new { message = "Product details not found" });
            }

            // Calculate total price for the specific product
            decimal totalAmount = cartItem.Quantity * product.Price;
            // Create a new Order for the product
            var order = new Order
            {
                User_Id = checkoutDto.UserId,
                OrderDate = DateTime.Now,
                TotalAmount = totalAmount,
                Payments = new List<Payment>()
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            // Create a Payment record
            var payment = new Payment
            {
                OrderID = order.OrderID,
                PaymentDate = DateTime.Now,
                Amount = totalAmount,
                PaymentMethod = "CreditCard" // Example method
            };

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            // Remove the product from the cart
            await _cartItemRepo.DeleteAsync(cartItem.CartItemID);

            // Update cart totals
            cart.ProductCount -= cartItem.Quantity;
            cart.TotalPrice -= totalAmount;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Product checked out successfully", orderId = order.OrderID });
        }



    }
}
