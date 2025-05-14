using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_Commerce.Models
{
    public class Order
    {
        public int OrderID { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }

        // Foreign Key
        [ForeignKey("User")]

        public string User_Id { get; set; } // Identity User's ID
        public IdentityUser User { get; set; }

        // Navigation Property
        public ICollection<Payment> Payments { get; set; }
    }
}
