import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "./User.context";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const { token, userId } = useContext(UserContext); // Access token and userId from UserContext
  const [cartInfo, setCartInfo] = useState(null); // Initialize with empty array or object

  console.log(userId);
  

  useEffect(() => {
    if (userId) {
      getCartProduct(); // Fetch cart products when userId is available
    }
  }, [userId]); // Only run when userId changes

  async function addProduct({ productId, quantity ,userId}) {
    console.log("Token:", token); // Check if the token is being passed
    console.log("User ID:", userId); // Check if the userId is available

    if (!token) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    try {
      const options = {
        url: "http://localhost:5236/api/Cart/AddToCart",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Ensure token is passed as Bearer token
        },
        data: {
          productId,
          quantity,
          userId, // Pass userId to API
        },
      };
      let { data } = await axios.request(options);
      console.log(data);
      getCartProduct(); // Fetch updated cart info after adding product
    } catch (error) {
      console.log("Error adding product to cart:", error);
    }
  }

  async function getCartProduct() {
    if (!userId) {
      alert("User ID");
      return;
    }

    try {
      const options = {
        url: `http://localhost:5236/api/Cart/GetCartProducts?userId=${userId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in headers
        },
      };
      let { data } = await axios.request(options);
      console.log("Cart Data:", data);
         setCartInfo(data);
   
      // Set the cart information
    } catch (error) {
      console.log("Error fetching cart data:", error);
    }
  }

  async function removeProduct({ productId,userId}) {
    console.log("Token:", token); // Check if the token is being passed
    console.log("User ID:", userId); // Check if the userId is available

    if (!token) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    try {
      const options = {
        url: `http://localhost:5236/api/Cart/RemoveFromCart?productId=${productId}&userId=${userId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Ensure token is passed as Bearer token
        },
        data: {
          productId,
          userId, // Pass userId to API
        },
      };
      let { data } = await axios.request(options);
      console.log(data); 
      getCartProduct()
    } catch (error) {
      console.log("Error adding product to cart:", error);
    }
  }

  async function updateProduct({ productId, quantity ,userId}) {
    console.log("Token:", token); // Check if the token is being passed
    console.log("User ID:", userId); // Check if the userId is available

    if (!token) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    try {
      const options = {
        url: "http://localhost:5236/api/Cart/EditCartItemQuantity",
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Ensure token is passed as Bearer token
        },
        data: {
          productId,
          quantity,
          userId, // Pass userId to API
        },
      };
      let { data } = await axios.request(options);
      console.log(data);
      getCartProduct(); // Fetch updated cart info after adding product
    } catch (error) {
      console.log("Error adding product to cart:", error);
    }
  }
  
  
  return (
    <CartContext.Provider value={{ addProduct, getCartProduct, cartInfo,removeProduct, updateProduct }}>
      {children}
    </CartContext.Provider>
  );
}
