import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "./User.context";

export const WishlistContext = createContext(null);

export default function WishlistProvider({ children }) {
  const { token, userId } = useContext(UserContext); // Access token and userId from UserContext
  const [wishlistInfo, setWishlistInfo] = useState(null); // Initialize with empty array or object

  useEffect(() => {
    if (userId) {
      getWishlist(); // Fetch wishlist products when userId is available
    }
  }, [userId]); // Only run when userId changes

  async function addProductToWishlist({ productId, userId }) {
    if (!token) {
      alert("You must be logged in to add items to the wishlist.");
      return;
    }

    try {
      const options = {
        url: "http://localhost:5236/api/Wishlist/AddToWishlist",
        method: "POST",
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
      getWishlist(); // Fetch updated wishlist after adding product
    } catch (error) {
      console.log("Error adding product to wishlist:", error);
    }
  }

  async function getWishlist() {
    if (!userId) {
      alert("User ID is missing");
      return;
    }

    try {
      const options = {
        url: `http://localhost:5236/api/Wishlist/GetWishlistProducts?userId=${userId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in headers
        },
      };
      let { data } = await axios.request(options);
      console.log("Wishlist Data:", data);
      setWishlistInfo(data); // Set the wishlist information
    } catch (error) {
      console.log("Error fetching wishlist data:", error);
    }
  }

  async function removeProductFromWishlist({ productId, userId }) {
    if (!token) {
      alert("You must be logged in to remove items from the wishlist.");
      return;
    }

    try {
      const options = {
        url: `http://localhost:5236/api/Wishlist/RemoveFromWishlist?productId=${productId}&userId=${userId}`,
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
      getWishlist(); // Fetch updated wishlist after removing product
    } catch (error) {
      console.log("Error removing product from wishlist:", error);
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        addProductToWishlist,
        getWishlist,
        wishlistInfo,
        removeProductFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
