using System.ComponentModel.DataAnnotations.Schema;

namespace E_Commerce.Models
{
    public class CartItem
    {
        public int CartItemID { get; set; }
        public int Quantity { get; set; }

        // Foreign Keys
        [ForeignKey("Cart")]

        public int CartID { get; set; }
        public Cart Cart { get; set; }
        [ForeignKey("Product")]
        public int ProductID { get; set; }
        public Product Product { get; set; }
    }
}
