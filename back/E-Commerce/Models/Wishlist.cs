using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_Commerce.Models
{
    public class Wishlist
    {
        public int WishlistID { get; set; }

        // Foreign Key
        [ForeignKey("User")]

        public string User_Id { get; set; } // Identity User's ID
        public IdentityUser User { get; set; }

        // Navigation Property
        public ICollection<WishlistItem> WishlistItems { get; set; }
    }
}
