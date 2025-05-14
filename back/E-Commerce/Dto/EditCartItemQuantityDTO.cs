namespace E_Commerce.Dto
{
    public class EditCartItemQuantityDTO
    {
        public string UserId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
