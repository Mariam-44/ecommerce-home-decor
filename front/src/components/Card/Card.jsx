import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/Cart.context"; // Make sure CartContext has addProductToWishlist
import { UserContext } from "../context/User.context"; // Import UserContext to get userId
import { WishlistContext } from "../context/Wishlist.context";

export default function Card({ productInfo = {} }) {
  const { imageList, category, name, price, rating, productID } = productInfo;
  const { addProduct} = useContext(CartContext); // Get addProductToWishlist from CartContext
  const { addProductToWishlist } = useContext(WishlistContext); // Get addProductToWishlist from CartContext
  const { userId } = useContext(UserContext); // Access userId from UserContext
  const navigate = useNavigate();

  console.log(userId);

  // Fetch userId if it's not available when component mounts or token changes
  useEffect(() => {
    if (!userId) {
      console.log("User is not logged in. Please log in to add products to cart.");
    }
  }, [userId]);

  const handleNavigate = () => {
    navigate(`/productdetails`, { state: productInfo });
  };

  const handleAddToCart = () => {
    if (!userId) {
      alert("Please login first.");
      return;
    }

    const quantity = 1;  // Default quantity to add to cart
    addProduct({ productId: productID, quantity, userId }); // Send productId, quantity, and userId to addProduct
  };

  const handleAddToWishlist = () => {
    if (!userId) {
      alert("Please login first.");
      return;
    }

    addProductToWishlist({ productId: productID, userId }); // Add product to wishlist
  };

  const imageUrl =
    imageList && imageList.length > 0
      ? `http://localhost:5236/Uploads/${imageList[0]}`
      : "";

  return (
    <div className="col-span-3 my-3 shadow-md rounded-md overflow-hidden w-60">
      <div>
        <div className="relative">
          {imageUrl && (
            <img
              className="w-full h-56 object-cover cursor-pointer"
              src={imageUrl}
              alt="Product"
              onClick={handleNavigate} // Click to navigate to product details
            />
          )}
          <div className="layer px-2 py-3 flex flex-col items-end justify-start gap-3 absolute w-fit h-fit right-0 top-0">
            <div
              onClick={handleAddToCart}
              className="icon hover:scale-110 transition-transform duration-300 hover:rotate-6 w-10 h-10 cursor-pointer rounded-full bg-primary-500 text-lg text-white flex items-center justify-center"
            >
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <div
              onClick={handleAddToWishlist} // Add product to wishlist on heart icon click
              className="icon hover:scale-110 transition-transform duration-300 hover:rotate-6 w-10 h-10 cursor-pointer rounded-full bg-primary-500 text-lg text-white flex items-center justify-center"
              aria-label="Add to wishlist"
            >
              <i className="fa-solid fa-heart  text-white"></i>
            </div>
          </div>
        </div>
        <div className="p-2">
          <h3 className="text-gray-800 text-sm font-bold text-center">
            {category}
          </h3>
          <h2 className="text-sm text-gray-700 font-semibold line-clamp-1 text-center mt-1">
            {name}
          </h2>
          <div className="flex items-center text-gray-700 justify-between mx-2 mt-1">
            <span className="text-sm">{price}$</span>
            <div className="flex items-center gap-1 text-sm">
              <span className="font-bold">{rating}.0</span>
              <i className="fa-solid fa-star text-sm text-yellow-500"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
