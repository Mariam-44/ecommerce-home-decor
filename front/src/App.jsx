import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Categories from "./pages/Categories/Categories";
import Contact from "./pages/Contact/Contact";
import Productdetails from "./pages/CardDetails/CardDetails";
import Cart from "./pages/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Favourite from "./pages/Favourite/Favourite";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Checkout from "./pages/Checkout/Checkout";
import CartProvider from "./components/context/Cart.context";
import UserProvider from "./components/context/User.context";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import GuestRoute from "./components/GuestRoute/GuestRoute";
import WishlistProvider from "./components/context/Wishlist.context";
import Whishlist from "./pages/Whishlist/Whishlist";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "productdetails", element: <Productdetails /> },
        { path: "category", element: <Categories /> },
        { path: "wishlist", element: <Whishlist /> },
        { path: "cart", element: <Cart /> },     
        { path: "contact", element: <Contact /> },
        { path: "checkout", element: <Checkout /> },
        { path: "signup", element: <Signup /> },
        { path: "login", element: <Login /> },
      ],
    },
      
  ]);

  return (      
    <UserProvider>

        <CartProvider><WishlistProvider>
          <RouterProvider router={router} />  </WishlistProvider>
        </CartProvider>
    
    </UserProvider>
  );
}

export default App;
