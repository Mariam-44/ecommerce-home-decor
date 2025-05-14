using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_Commerce.Models
{
    public class Cart
    {
        public int CartID { get; set; }
        public int ProductCount { get; set; }
        public decimal TotalPrice { get; set; }

        // Foreign Key
        [ForeignKey("User")]

        public string User_Id { get; set; } // Identity User's ID
        public IdentityUser User { get; set; }

        // Navigation Properties
        public ICollection<CartItem> CartItems { get; set; }
    }
}
