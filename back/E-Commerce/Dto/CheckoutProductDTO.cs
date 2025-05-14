using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace E_Commerce.Dto
{
    public class CheckoutProductDTO : IValidatableObject
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Name must be between 3 and 100 characters.")]
        public string Name { get; set; }

        [Required]
        [StringLength(200, MinimumLength = 10, ErrorMessage = "Address must be between 10 and 200 characters.")]
        public string Address { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "ProductId must be greater than 0.")]
        public int ProductId { get; set; }

        [Required]
        [RegularExpression(@"^\d{4}-?\d{4}-?\d{4}-?\d{4}$", ErrorMessage = "CardNumber must be 16 digits, optionally separated by dashes.")]
        public string CardNumber { get; set; }

        [Required]
        [RegularExpression(@"^(0[1-9]|1[0-2])\/\d{2}$", ErrorMessage = "ExpiryDate must be in MM/YY format.")]
        public string ExpiryDate { get; set; }

        [Required]
        [RegularExpression(@"^\d{3}$", ErrorMessage = "CVV must be a 3-digit number.")]
        public string CVV { get; set; }


        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            // Validate ExpiryDate
            if (DateTime.TryParseExact(
                ExpiryDate,
                "MM/yy",
                CultureInfo.InvariantCulture,
                DateTimeStyles.None,
                out DateTime expiryDate))
            {
                // Check if the expiry date is in the past
                var lastDayOfMonth = new DateTime(expiryDate.Year, expiryDate.Month, DateTime.DaysInMonth(expiryDate.Year, expiryDate.Month));
                if (lastDayOfMonth < DateTime.Now)
                {
                    yield return new ValidationResult("ExpiryDate is in the past.", new[] { nameof(ExpiryDate) });
                }
            }
            else
            {
                yield return new ValidationResult("ExpiryDate is not a valid date.", new[] { nameof(ExpiryDate) });
            }
        }
    }
}
