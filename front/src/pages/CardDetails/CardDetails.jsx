import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Productdetails() {
  const location = useLocation();
  const product = location.state;

  const [selectedImage, setSelectedImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (product?.imageList?.length > 0) {
      setSelectedImage(`http://localhost:5236/Uploads/${product.imageList[0]}`);
    }
  }, [product]);

  useEffect(() => {
    if (product?.subCategory_ID) {
      setLoading(true);
      setError(null);
      
      axios
        .get("http://localhost:5236/api/Product")
        .then((response) => {
          const filtered = response.data.filter(
            (p) =>
              p.subCategory_ID === product.subCategory_ID &&
              p.productID !== product.productID
          );
          setRelatedProducts(filtered);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching related products:", err);
          setError("Failed to load related products");
          setRelatedProducts([]);
          setLoading(false);
        });
    }
  }, [product]);

  if (!product) {
    return <p>No product data available</p>;
  }

  const { imageList = [], subCategory, name, price, rating, description = "" } = product;

  return (
    <>
      {/* Product Details */}
      <div className="flex p-2 mt-10">
        <div className="flex gap-6 items-start max-w-6xl w-full mx-auto">
          {/* Thumbnails */}
          <div className="flex flex-col gap-4 pt-2">
            {imageList.map((img, index) => {
              const fullImageUrl = `http://localhost:5236/Uploads/${img}`;
              return (
                <img
                  key={index}
                  src={fullImageUrl}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 object-cover rounded-md cursor-pointer border ${
                    fullImageUrl === selectedImage ? "border-black" : "border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(fullImageUrl)}
                />
              );
            })}
          </div>

          {/* Main Image */}
          <div>
            <img
              src={selectedImage}
              alt={name}
              className="w-full h-80 object-contain rounded-md"
            />
          </div>

          {/* Product Info */}
          <div className="content py-4 space-y-2 w-72">
            <h3 className="text-xs text-gray-500 uppercase">{subCategory}</h3>
            <h3 className="text-lg font-bold text-gray-800">{name}</h3>
            <span className="font-bold text-gray-900">{price} LE</span>
            <h3 className="flex items-center text-gray-700">
              {rating}
              <i className="fa-solid fa-star text-yellow-400 text-sm ml-1"></i>
            </h3>
            <div>
              <h2 className="font-bold text-sm">Description</h2>
              <p className="text-xs text-gray-600 pt-1 line-clamp-5 leading-relaxed">
                {description}
              </p>
            </div>
            <div className="flex gap-2 pt-1">
              <button className="flex items-center justify-center gap-2 text-xs bg-gray-900 text-white border border-gray-900 rounded-md px-2 py-1 hover:bg-white hover:text-gray-900 transition-colors duration-300">
                Add to cart
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
              <button className="flex items-center justify-center gap-2 text-xs bg-green-500 text-white border border-white rounded-md px-2 py-1 hover:bg-white hover:text-green-600 transition-colors duration-300">
                <i className="fa-solid fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Slider */}
      <section className="my-20 px-48">
        <h2 className="text-2xl font-semibold text-center mb-8">Related Products</h2>
        {loading && <p className="text-center">Loading related products...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && relatedProducts.length === 0 && (
          <p className="text-center">No related products found</p>
        )}
        {!loading && !error && relatedProducts.length > 0 && (
          <Swiper
            slidesPerView={4}
           
            loop={relatedProducts.length > 4}
          >
            {relatedProducts.map((item) => (
              <SwiperSlide key={item.productID}>
                <div className="my-3 shadow-md rounded-md overflow-hidden  w-60">
                  <div>
                    <div className="relative">
                      <img
                        className="w-full h-56 object-cover cursor-pointer"
                        src={`http://localhost:5236/Uploads/${item.imageList[0]}`}
                        alt={item.name}
                      />
                      <div className="layer px-2 py-3 flex flex-col items-end gap-3 absolute right-0 top-0">
                        <div className="icon w-9 h-9 rounded-full bg-primary-500 text-white flex items-center justify-center cursor-pointer">
                          <i className="fa-solid fa-cart-shopping text-sm"></i>
                        </div>
                        <div className="icon w-9 h-9 rounded-full bg-primary-500 text-white flex items-center justify-center cursor-pointer">
                          <i className="fa-solid fa-heart text-sm"></i>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <h3 className="text-sm text-gray-600 text-center">{item.subCategory}</h3>
                      <h2 className="text-sm text-gray-800 font-semibold text-center mt-1 line-clamp-1">
                        {item.name}
                      </h2>
                      <div className="flex items-center justify-between text-sm text-gray-700 mx-2 mt-1">
                        <span>{item.price} LE</span>
                        <div className="flex items-center gap-1">
                          <span className="font-bold">{item.rating}.0</span>
                          <i className="fa-solid fa-star text-yellow-500 text-sm"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>
    </>
  );
}