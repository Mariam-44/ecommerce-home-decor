import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/User.context"; // Assuming you have this context for user info
import { CartContext } from "../context/Cart.context"; // Assuming CartContext is used for managing the cart

export default function WishlistItem({ productInfo }) {
  const { productName, price, quantity, productId } = productInfo;
  const [productDetails, setProductDetails] = useState(null);
  const { userId } = useContext(UserContext); // Assuming userId is available in UserContext
  const { addProduct, removeProductFromWishlist, updateProduct } = useContext(CartContext); // Get necessary functions from CartContext
  
  // Fetch product details from the API
  async function getProductDetails() {
    try {
      const options = {
        url: `http://localhost:5236/api/Product/${productId}`,
        method: "GET",
      };
      const { data } = await axios.request(options);
      setProductDetails(data); // Save the product data to state
    } catch (err) {
      console.error("Failed to load product details:", err);
    }
  }

  useEffect(() => {
    getProductDetails(); // Fetch product details on mount
  }, [productId]);

  // Handle image rendering
  const renderProductImage = () => {
    if (productDetails && productDetails.imageList && productDetails.imageList.length > 0) {
      const imageUrl = `http://localhost:5236/Uploads/${productDetails.imageList[0]}`;
      return <img src={imageUrl} alt="Product Thumbnail" className="w-16 h-16 object-cover mx-auto" />;
    }
    return <div>No image available</div>; // Fallback if no image is found
  };

  // Handle adding product to the cart
  const handleAddToCart = () => {
    addProduct({ productId, quantity, userId });
  };

  return (
    <>
      <td className="p-2 text-center">
        <button className="text-gray-400" onClick={() => removeProductFromWishlist({ productId, userId })}>
          <div className="h-8 w-8 border flex items-center justify-center rounded-full">
            <i className="fa-solid fa-xmark"></i>
          </div>
        </button>
      </td>
      <td className="p-2 text-center">
        {/* Render product image */}
        {renderProductImage()}
      </td>
      <td className="p-2 text-center">{productName}</td>
      <td className="p-2 text-center">{price.toFixed(2)} L.E</td>
      <td className="p-2 text-center">
  
      </td>
      <td className="p-2 text-center">
        {/* Add to Cart button */}
        <button
          onClick={handleAddToCart}
          className="py-2 px-4  text-white rounded bg-gray-800"
        >
          <i className="fa-solid fa-cart-plus"></i> Add to Cart
        </button>
      </td>
    </>
  );
}
