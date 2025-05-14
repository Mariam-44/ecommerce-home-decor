using System.ComponentModel.DataAnnotations.Schema;

namespace E_Commerce.Models
{
    public class WishlistItem
    {
        public int WishlistItemID { get; set; }

        // Foreign Keys
        [ForeignKey("Wishlist")]
        public int WishlistID { get; set; }
        public Wishlist Wishlist { get; set; }

        [ForeignKey("Product")]
        public int ProductID { get; set; }
        public Product Product { get; set; }
    }
}
