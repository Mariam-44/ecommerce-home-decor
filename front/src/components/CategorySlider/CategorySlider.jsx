import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function CategorySlider() {
  const [categories, setCategories] = useState(null);

  // Fetch categories from API
  async function getCategories() {
    try {
      const options = {
        url: "http://localhost:5236/api/Category",
        method: "GET",
      };
      const { data } = await axios.request(options);
      console.log(data);
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {categories ? (
        <section className="my-24 ms-4">
          <h2 className="text-2xl pb-10 font-semibold pt-5 text-center -ms-14">
            Home Essentials
          </h2>
          <Swiper slidesPerView={5} loop={true}>
            {categories.map((cat) => (
              <SwiperSlide key={cat.categoryID}>
                <div className="rounded-full overflow-hidden h-36 bg-white w-36 flex items-center justify-center">
                  <img
                    src={`http://localhost:5236/Uploads/${cat.image}`}
                    alt={cat.Name}
                    className="h-24 w-24 object-cover"
                  />
                </div>
                <h3 className="ps-11 pt-4">{cat.name}</h3>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
