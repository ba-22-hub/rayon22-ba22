import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import Slider from "react-slick";
import { supabase } from "../lib/supabaseClient";
import { useAuthor } from "../context/AuthorContext";

// Importing common components
import FunctionButton from "../common/FunctionButton";

// Importing assets
import roundLogo from "../assets/logos/roundLogo.png";
import { displayNotification } from "../lib/displayNotification.jsx";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#FF8200",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        zIndex: 10
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#FF8200",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        zIndex: 10
      }}
      onClick={onClick}
    />
  );
}

function ProductCarousel({ data }) {
  const { user } = useAuthor();
  const { cart, setCart } = useCart();
  const [stockIncertainThreshold, setStockIncertainThreshold] = useState(3);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchStockIncertainThreshold = async () => {
    const { data, error } = await supabase
      .from("constants")
      .select("value")
      .eq("name", "stockIncertainThreshold")
      .maybeSingle();
    if (!error) {
      setStockIncertainThreshold(data.value);
    }
  };
  fetchStockIncertainThreshold();

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
          const productAmountInCart = cart.content[product.id] || 0
          if (product.stock >= productAmountInCart) {
            setCart(prev => ({
              ...prev,
              content: {
                ...prev.content,
                [product.id]: (prev.content[product.id] || 0) + 1,
              }
            }));
          } else {
            displayNotification("Stock de " + product.name + " insuffisant", "", "danger")
          }
        };

        const RemoveFromCart = () => {
          if (Object.keys(cart.content).includes(product.id)) {
            if (cart.content[product.id] <= 1) {
              setCart((prevData) => {
                const newCart = { ...prevData };
                delete newCart.content[product.id];
                return newCart;
              });
            } else {
              setCart(prev => ({
                ...prev,
                content: {
                  ...prev.content,
                  [product.id]: prev.content[product.id] - 1,
                }
              }));
            }
          }
        };

        if (Object.keys(cart.content).includes(product.id) && cart.content[product.id] > 0) {
          return (
            <div className="flex items-center gap-2">
              <button
                onClick={RemoveFromCart}
                className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full font-bold text-lg flex items-center justify-center transition-all shadow-md hover:shadow-lg"
              >
                −
              </button>
              <span className="text-[#3435FF] text-xl font-bold min-w-[2rem] text-center">
                {cart.content[product.id]}
              </span>
              <button
                onClick={AddToCart}
                className="w-8 h-8 bg-[#3435FF] hover:bg-[#5253ff] text-white rounded-full font-bold text-lg flex items-center justify-center transition-all shadow-md hover:shadow-lg"
              >
                +
              </button>
            </div>
          );
        } else {
          return (
            <button
              onClick={AddToCart}
              className="w-8 h-8 bg-[#3435FF] hover:bg-[#5253ff] text-white rounded-full font-bold text-lg flex items-center justify-center transition-all shadow-md hover:shadow-lg"
            >
              +
            </button>
          );
        }
      }
    }

    return (
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden w-64 lg:w-72 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
        {/* En-tête avec prix et boutons */}
        <div className="bg-gradient-to-br from-blue-50 to-white p-4 border-b-2 border-[#3435FF]">
          <div className="flex justify-between items-center mb-2">
            <div>
              <div className="text-[#FF8200] text-3xl font-bold">
                {product.salePrice}€
              </div>
              <div className="text-red-500 text-xs line-through">
                Prix magasin : {product.price}€
              </div>
            </div>
            <DisplayButtons product={product} />
          </div>
          <div className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full inline-block">
            Économie : {((1 - product.salePrice / product.price) * 100).toFixed(0)}%
          </div>
        </div>

        {/* Image du produit */}
        <div className="relative bg-white h-48 flex items-center justify-center p-4">
          <img
            src={product.imageUrl || roundLogo}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />
          {((product.productStockIncertainThreshold && product.stock <= product.productStockIncertainThreshold) ||
            (product.stock <= stockIncertainThreshold)) && (
              <div className="absolute top-0 left-0 right-0">
                <div className="bg-[#FF8200] bg-opacity-95 text-white text-center py-2 px-4 font-bold text-sm shadow-lg">
                  STOCK INCERTAIN
                </div>
              </div>
            )}
        </div>

        {/* Informations produit */}
        <div className="p-4">
          <h3 className="text-[#3435FF] text-lg font-bold mb-1 line-clamp-2 min-h-[3.5rem]">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <span className="bg-blue-100 text-[#3435FF] px-2 py-1 rounded-full text-xs font-semibold">
              {product.weight}g
            </span>
            <span className="bg-orange-100 text-[#FF8200] px-2 py-1 rounded-full text-xs font-semibold">
              {product.category}
            </span>
          </div>
          <button
            className="w-full bg-gradient-to-r from-[#3435FF] to-[#5253ff] hover:from-[#5253ff] hover:to-[#3435FF] text-white py-2 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
            onClick={() => setSelectedProduct(product)}
          >
            Voir les détails
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 mx-auto mb-12">
      <Slider {...settings}>
        {data.map((product, idx) => (
          <div key={idx} className="p-4">
            <DisplayProduct product={product} />
          </div>
        ))}
      </Slider>

      {/* Modal de détails */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative overflow-hidden">
            {/* En-tête de la modal */}
            <div className="bg-gradient-to-r from-[#3435FF] to-[#5253ff] p-6 text-white">
              <button
                className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white text-2xl font-bold transition-all"
                onClick={() => setSelectedProduct(null)}
              >
                ✕
              </button>
              <h2 className="text-3xl font-bold pr-12">
                {selectedProduct.name}
              </h2>
            </div>

            {/* Contenu de la modal */}
            <div className="flex flex-col md:flex-row p-6 gap-6">
              {/* Image */}
              <div className="md:w-1/2 flex items-center justify-center bg-gray-50 rounded-xl p-6">
                <img
                  src={selectedProduct.imageUrl || roundLogo}
                  alt={selectedProduct.name}
                  className="max-h-80 object-contain"
                />
              </div>

              {/* Informations */}
              <div className="md:w-1/2 space-y-4">
                {/* Prix */}
                <div className="bg-gradient-to-br from-orange-50 to-white p-4 rounded-xl border-l-4 border-[#FF8200]">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm text-gray-600">Prix Rayon22</p>
                      <p className="text-3xl font-bold text-[#FF8200]">
                        {selectedProduct.salePrice}€
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Prix magasin</p>
                      <p className="text-xl line-through text-red-500">
                        {selectedProduct.price}€
                      </p>
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full inline-block">
                    Vous économisez {((1 - selectedProduct.salePrice / selectedProduct.price) * 100).toFixed(0)}%
                  </div>
                </div>

                {/* Détails */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-600 w-32">Catégorie</span>
                    <span className="bg-blue-100 text-[#3435FF] px-3 py-1 rounded-full text-sm font-semibold">
                      {selectedProduct.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-600 w-32">Poids</span>
                    <span className="text-gray-800 font-medium">{selectedProduct.weight} g</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-600 w-32">Stock disponible</span>
                    <span className={`font-medium ${selectedProduct.stock > stockIncertainThreshold ? 'text-green-600' : 'text-orange-600'}`}>
                      {selectedProduct.stock} unités
                    </span>
                  </div>
                </div>

                {/* Description */}
                {selectedProduct.description && (
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm font-semibold text-gray-600 mb-2">Description</p>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCarousel;