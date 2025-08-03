import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from 'react';

// Importing common components
import FunctionButton from "../common/FunctionButton"


import Slider from "react-slick";

{/* TODO: Add here the real showcase products (the showcase isn't linked tho the database) */ }

{/* CAROUSEL ARROWS */ }
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
    function DisplayButtons({ product }) {
      const [nbProd, setNbProd] = useState(product.nbInCart)

      const AddToCart = () => {
        setNbProd(nbProd + 1)
        product.nbInCart = nbProd
      }

      const RemoveFromCart = () => {
        if (nbProd > 0) {
          setNbProd(nbProd - 1)
          product.nbInCart = nbProd
        }
      }

      if (nbProd > 0) {
        return <div className="flex jusitfy-end">
          <FunctionButton className="text-white bg-[#FF8200] hover:bg-[#ff9800] rounded-full text-sm px-2 py-0.5 mb-2" buttonText="-" fun={RemoveFromCart} />
          <p className="text-[#3435FF] text-xl mr-1 ml-1 font-semibold">{nbProd}</p>
          <FunctionButton className="text-white bg-[#3435FF] hover:bg-[#5253ff] rounded-full text-sm px-2 py-0.5 mb-2 ml-0 text-right" buttonText="+" fun={AddToCart} />
        </div>
      }
      else {
        return <div className="flex jusitfy-end">
          <FunctionButton className="text-white bg-[#3435FF] hover:bg-[#5253ff] rounded-full text-sm px-2 py-0.5 mb-2 ml-0 text-right" buttonText="+" fun={AddToCart} />
        </div>
      }
    }

    return <>
      <div className="bg-white shadow-md rounded-xl overflow-hidden w-60 ml-0.1">
        <div className="p-4">

          <div className="flex justify-between">
            <h3 className="text-[#3435FF] text-3xl font-semibold text-left">{product.salePrice}€</h3>
            <DisplayButtons product={product} />
          </div>

          <div className="text-[#ff6161] text-xs ml-0">Prix en magasin : {product.price}€</div>
        </div>
        <img src={product.image} alt={product.name} className="w-full h-40 object-contain" />
        <div className="p-4">
          <p className="text-[#3435FF] text-lg font-semibold">{product.name}</p>
          <p className="text-[#3435FF] text-xs">{product.weight}g, {product.category || ''}</p>
        </div>
      </div>
    </>
  }

  return (
    <div className="px-8 mx-auto mb-12">
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
