import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(null);
  
  // Function to fetch userId from the token
  async function getUserId() {
    if (token) {
        console.log(token);
        
      try {
        const options = {
          url: `http://localhost:5236/api/Account/get-user-id?token=${token}`, // API endpoint to fetch userId
          method: "GET",
          header:{
            token
          }

        };
        const { data } = await axios.request(options);
        console.log(data); // Ensure this contains the userId, adjust accordingly
        if (data.userId) {
          setUserId(data.userId); // Set the userId state
        }
      } catch (error) {
        console.log("Error fetching userId:", error);
      }
    }
  }

  useEffect(() => {
    if (token) {
      getUserId(); // Fetch the userId whenever the token changes
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ token, userId, setToken, setUserId, getUserId }}>
      {children}
    </UserContext.Provider>
  );
}
