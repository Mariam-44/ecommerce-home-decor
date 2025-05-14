import CategorySlider from "../../components/CategorySlider/CategorySlider";
import img from "../../assets/images/home.jpg";
import LivingRoom from "../../components/CategoryDetails/LivingRoom";
import Card from "../../components/Card/Card";
import img2 from "../../assets/images/2.jpg";
import img3 from "../../assets/images/3.jpg";
import img4 from "../../assets/images/4.jpg";
import img5 from "../../assets/images/5.jpg";
import img6 from "../../assets/images/6.jpg";
import img8 from "../../assets/images/8.jpg";
import img9 from "../../assets/images/9 .jpg";
import img11 from "../../assets/images/11.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState(null);

  // Fetch categories from API
  async function getProducts() {
    try {
      const options = {
        url: "http://localhost:5236/api/Product",
        method: "GET",
      };
      const { data } = await axios.request(options);
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="bg-bannerImg bg-bottom h-screen bg-no-repeat bg-cover "></div>
      <div className="container mx-auto">
{/* Category slider component for displaying product categories <CategorySlider /> */}

        {products ? (
          <div className="cards">
            <h2 className="relative  w-fit mx-auto p-1 text-center font-bold text-xl mt-10 mb-5 after:absolute after:bottom-0 after:left-0 after:w-full  after:h-[1px] after:bg-slate-300">
              New Arrivals
            </h2>
            <div className="grid grid-cols-12 gap-0 py-3">
              {products.map((product) => (
                <Card key={product.id} productInfo={product}  />
              ))}
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}

        <LivingRoom />
      </div>
    </>
  );
}
