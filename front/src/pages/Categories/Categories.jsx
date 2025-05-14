import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  async function getCategories() {
    try {
      const options = {
        url: "http://localhost:5236/api/SubCategory",
        method: "GET",
      };
      const { data } = await axios.request(options);
      console.log(data);
      setCategories(data);
    } catch (err) {
      console.error("Failed to load categories:", err);
      setError("Failed to load categories. Please try again.");
    }
  }

  function getRandomProducts(products, count) {
    if (!products || !Array.isArray(products)) return [];
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  useEffect(() => {
    getCategories();
  }, []);
  
  return (
    <div className="container px-5 py-14 mx-auto">
      {/* Error Handling */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Navbar */}
      <div className="navbar pb-16">
        <ul className="flex space-x-4 py-4">
          {categories.map((category) => (
            <li
              key={category.categoryID}
              className="px-2 py-1 rounded-md text-sm border border-transparent bg-black text-white hover:border-black hover:bg-white hover:text-black"
            >
              <button
                onClick={() =>
                  document
                    .getElementById(category.categoryID)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="scroll-link"
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Category Sections */}
      {categories.map((category) => (
        <section
          key={category.categoryID}
          id={category.categoryID}
          className="category py-8"
        >
          <div className="flex justify-between items-center">
            <h2 className="font-bold">{category.name}</h2>
            <button
              className="bg-black text-white text-xs px-2 py-1 rounded-md border border-transparent hover:bg-white hover:text-black hover:border-black transition-all duration-300"
            >
              View all {category.name}
            </button>
          </div>

          {/* Image and Description
          <div className="py-4">
            <img
              src={`http://localhost:5236/uploads/${category.image}`}
              alt={category.name}
              className="w-full h-52 object-cover rounded-md mb-4"
            />
            <p>{category.description}</p>
          </div> */}

          {/* Products Section */}
          { category.products ? (
            <div className="py-6">
              <Swiper
                slidesPerView={6}
                loop={true}
                spaceBetween={6}
                navigation
                modules={[Navigation]}
              >
                {getRandomProducts(category.products, 6).map(
                  (product) => (
                    <SwiperSlide key={product.productID}>
                      <div className="bg-white cursor-pointer">
                        <div className="relative">
                          <img
                            src={product.imageList[0]}
                            className="w-full h-52 object-cover"
                            alt={product.name}
                          />
                        </div>
                        <div className="flex justify-between items-center px-2 py-1">
                          <h3 className="text-sm font-medium">{product.name}</h3>
                          <span className="text-xs">{product.price} LE</span>
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            </div>
          ) : (
            <p className="text-gray-500">No products available in this category.</p>
          )}
        </section>
      ))}
    </div>
  );
}
