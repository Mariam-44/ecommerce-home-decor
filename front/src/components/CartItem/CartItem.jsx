import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/User.context";
import { CartContext } from "../context/Cart.context";

export default function CartItem({ productInfo }) {
  const { productName, price, quantity, productId } = productInfo;
  const [productDetails, setProductDetails] = useState(null);
  const { userId } = useContext(UserContext);
   const { removeProduct,updateProduct } = useContext(CartContext);

  // Fetch product details from the API
  async function getProductDetails() {
    try {
      const options = {
        url: `http://localhost:5236/api/Product/${productId}`,
        method: "GET",
      };
      const { data } = await axios.request(options);
      setProductDetails(data); // Save the product data to state
      console.log(data);
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
      // Construct image URL using the first image in the imageList
      const imageUrl = `http://localhost:5236/Uploads/${productDetails.imageList[0]}`;
      return <img src={imageUrl} alt="Product Thumbnail" className="w-16 h-16 object-cover mx-auto" />;
    }
    return <div>No image available</div>; // Fallback if no image is found
  };

  return (
    <>
      <td className="p-2 text-center">
        <button className="text-gray-400">
          <div className="h-8 w-8 border flex items-center justify-center rounded-full" onClick={()=>{removeProduct({productId : productId , userId })}}>

            <i className="fa-solid fa-xmark"></i>
          </div>
        </button>
      </td>
      <td className="p-2 text-center">
        {/* Render image here */}
        {renderProductImage()}
      </td>
      <td className="p-2 text-center">{productName}</td>
      <td className="p-2 text-center">{price.toFixed(2)} L.E</td>
      <td className="p-2 text-center">
        <div className="flex items-center justify-center">
          <button className="text-lg border p-2 py-0" onClick={()=>{updateProduct({productId : productId , quantity : quantity - 1 , userId})}}>
            <span>-</span>
          </button>
          <span className="text-lg border p-2 py-0">{quantity}</span>
          <button className="text-lg border p-2 py-0" onClick={()=>{updateProduct({productId : productId , quantity : quantity + 1 , userId})}}>
            <span>+</span>
          </button>
        </div>
      </td>
    </>
  );
}
