import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import Slider from "react-slick";
import { supabase } from "../lib/supabaseClient.js";
import { useAuthor } from "../context/AuthorContext.jsx";

// Importing common components
import FunctionButton from "./FunctionButton.jsx";

// Importing assets
import roundLogo from "../assets/logos/roundLogo.png";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#FF8200" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "triangle", background: "#FF8200" }}
      onClick={onClick}
    />
  );
}

function ProductCarousel({ data }) {
  const { user } = useAuthor();
  const { cart, setCart } = useCart();

  const settings = {
    infinite: false,
    speed: 500,
    variableWidth: true,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function DisplayProduct({ product }) {

    return (
      <>
        <div className="bg-white shadow-md lg:rounded-xl overflow-hidden lg:w-60 w-44 ml-0.1">
          <div className="p-2 lg:p-4">
            <div className="flex justify-between">
              <h3 className="text-[#3435FF] text-2xl lg:text-3xl font-semibold text-left">
                {product.salePrice}€
              </h3>
            </div>
          </div>
          <div className="relative text-center">
          </div>
          <div className="p-2 lg:p-4">
            <p className="text-[#3435FF] text-lg font-semibold">
              {product.name}
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="px-8 mx-auto mb-12 bg-rayonblue lg:bg-inherit">
      <Slider {...settings}>
        {data.map((product, idx) => (
          <div key={idx} className="p-4">
            <DisplayProduct product={product}></DisplayProduct>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ProductCarousel;
