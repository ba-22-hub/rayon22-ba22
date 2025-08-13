import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from 'react';
import { useCart } from "../context/CartContext.jsx";
import Slider from "react-slick";
import { supabase } from "../lib/supabaseClient";
import { useAuthor } from '../context/AuthorContext'

// Importing common components
import FunctionButton from "../common/FunctionButton"

// Importing assets
import roundLogo from "../assets/logos/roundLogo.png"

const stockIncertainLimit = 3   // Limit (included) under which the 'Stock Incertain' label is displayed

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
  const { cart, setCart } = useCart()
  const { user } = useAuthor()

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
      if (user) {

        const AddToCart = () => {
          if (Object.keys(cart).includes(product.id)) {
            // Product already in cart
            setCart(prevData => ({
              ...prevData,
              [product.id]: prevData[product.id] + 1
            }))
          }
          else {
            // New product added to cart
            setCart(prevData => ({
              ...prevData,
              [product.id]: 1
            }))
          }
        }

        const RemoveFromCart = () => {
          if (Object.keys(cart).includes(product.id)) {   // Should always be true when function called
            if (cart[product.id] <= 1) {
              // Removing last item of this product from cart : product removed from cart
              setCart(prevData => {
                const newCart = { ...prevData };
                delete newCart[product.id];
                return newCart;
              });
            }
            else {
              setCart(prevData => ({
                ...prevData,
                [product.id]: prevData[product.id] - 1
              }))
            }
          }
        }

        if (Object.keys(cart).includes(product.id) && cart[product.id] > 0) {
          return <div className="flex jusitfy-end">
            <FunctionButton className="text-white bg-[#FF8200] hover:bg-[#ff9800] rounded-full text-sm px-2 py-0.5 mb-2" buttonText="-" fun={RemoveFromCart} />
            <p className="text-[#3435FF] text-xl mr-1 ml-1 font-semibold">{cart[product.id] || ""}</p>
            <FunctionButton className="text-white bg-[#3435FF] hover:bg-[#5253ff] rounded-full text-sm px-2 py-0.5 mb-2 ml-0 text-right" buttonText="+" fun={AddToCart} />
          </div>
        }
        else {
          return <div className="flex jusitfy-end">
            <FunctionButton className="text-white bg-[#3435FF] hover:bg-[#5253ff] rounded-full text-sm px-2 py-0.5 mb-2 ml-0 text-right" buttonText="+" fun={AddToCart} />
          </div>
        }
      }
    }

    function DisplayImage({ product }) {
      const [imageUrl, setImageUrl] = useState(null);

      useEffect(() => {
        async function fetchImage() {
          const { data, error } = await supabase
            .storage
            .from("images")
            .download(product.image_name);

          if (error) {
            console.error("Erreur lors du téléchargement de l'image " + product.image_name + " : ", error.message);
            return
          }

          const url = URL.createObjectURL(data);
          setImageUrl(url);

        }

        fetchImage();
      }, [product.image_name]);

      return <>
        <img src={imageUrl || roundLogo} alt={product.name} className="w-full h-40 object-contain" />
      </>
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
        <div className="relative text-center">
          <DisplayImage product={product}></DisplayImage>
          {product.stock <= stockIncertainLimit && (
            <div className="w-full absolute top-0 left-0 text-center mt-0">
              <p className="text-xl text-white bg-rayonorange bg-opacity-80 text-center">
                STOCK INCERTAIN
              </p>
            </div>
          )}
        </div>
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
