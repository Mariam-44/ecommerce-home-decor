import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Login from "../../pages/Login/Login";

export default function Navbar() {
  const location = useLocation();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  if (location.pathname === "/signup") {
    return null;
  }

  return (
    <>
      <nav className="bg-white">
        <div className="container sticky ms-40 py-5 text-black">
          <div className="flex justify-between items-center">
            <a href="/" className="text-3xl font-bold">
              Ligno
            </a>

            <ul className="flex items-center gap-5">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/category">Category</NavLink>
              </li>
              <li>
                <NavLink to="/wishlist">Favourite</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>

            <div className="icons flex items-center gap-7 text-xl">
              <Link to="/cart">
                <i className="fa-solid fa-cart-shopping"></i>
              </Link>

              {/* Add heart icon for wishlist */}
              <Link to="/wishlist">
                <i className="fa-solid fa-heart"></i>
              </Link>

              <button onClick={toggleLogin}>
                <i className="fa-regular fa-user"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Login isOpen={isLoginOpen} toggleLogin={toggleLogin} />
    </>
  );
}
