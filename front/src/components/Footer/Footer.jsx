import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#f5f1ea] mt-10">
      <div className="container mx-auto px-4 pt-12 pb-10">
        <div className="grid grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-[#876652]">
            Décorio
            </h3>
            <p className="text-[#6c5442]">
              Bringing elegance and comfort to your home with our curated collection of decor items.
            </p>
            <div className="flex space-x-6 ">
              <Link to="#" className="text-[#6c5442] hover:text-[#584536] transition">
                <i className="fa-brands fa-facebook-f"></i>
              </Link>
              <Link to="#" className="text-[#6c5442] hover:text-[#584536] transition">
                <i className="fa-brands fa-instagram"></i>
              </Link>
              <Link to="#" className="text-[#6c5442] hover:text-[#584536] transition">
                <i className="fa-brands fa-pinterest-p"></i>
              </Link>
              <Link to="#" className="text-[#6c5442] hover:text-[#584536] transition">
                <i className="fa-brands fa-twitter"></i>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#836652]">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-[#6c5442] hover:text-[#584536] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/category" className="text-[#6c5442] hover:text-[#584536] transition">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-[#6c5442] hover:text-[#584536] transition">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#6c5442] hover:text-[#584536] transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#6c5442] hover:text-[#584536] transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#836652]">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping" className="text-[#6c5442] hover:text-[#584536] transition">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-[#6c5442] hover:text-[#584536] transition">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-[#6c5442] hover:text-[#584536] transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-[#6c5442] hover:text-[#584536] transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-[#6c5442] hover:text-[#584536] transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#836652]">Contact Us</h3>
            <div className="space-y-3">
              <p className="text-[#6c5442] flex items-start">
                <i className="fa-solid fa-location-dot mr-2 mt-1"></i>
                123 Decor Street, Homeville, HV 12345
              </p>
              <p className="text-[#6c5442] flex items-center">
                <i className="fa-solid fa-phone mr-2"></i>
                (123) 456-7890
              </p>
              <p className="text-[#6c5442] flex items-center">
                <i className="fa-solid fa-envelope mr-2"></i>
                info@decorhaven.com
              </p>
            </div>

            {/* Newsletter */}
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-[#836652] mb-2">
                Newsletter
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 text-sm border border-[#d9c8b5] rounded-l focus:outline-none focus:ring-1 focus:ring-[#b59275] w-full"
                />
                <button className="bg-[#b59275] hover:bg-[#9e7d63] text-white px-4 py-2 rounded-r text-sm transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#e8ddd0] mt-10 pt-6 text-center text-[#6c5442] text-sm">
          <p>
            &copy; {new Date().getFullYear()} Décorio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}