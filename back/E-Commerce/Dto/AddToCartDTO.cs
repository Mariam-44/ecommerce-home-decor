﻿namespace E_Commerce.Dto
{
    public class AddToCartDTO
    {
        public int ProductId { get; set; } 
        public int Quantity { get; set; }  
        public string UserId { get; set; }
    }
}
