using System.ComponentModel.DataAnnotations.Schema;

namespace E_Commerce.Models
{
    public class Payment
    {
        public int PaymentID { get; set; }
        public DateTime PaymentDate { get; set; }
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; }
        // Foreign Key
        [ForeignKey("Order")]

        public int OrderID { get; set; }

        // Navigation Property
        public Order Order { get; set; }
    }
}
