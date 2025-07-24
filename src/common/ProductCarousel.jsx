import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


import Slider from "react-slick";
import plate from "../assets/logos/bigRoundLogo.png"; // remplace avec tes vraies images

const mockProducts = [
  {
    name: "Pâtes complètes",
    image: plate,
    price: "2.50€",
    salePrice: "1.00€",
  },
  {
    name: "Lait demi-écrémé",
    image: plate,
    price: "1.20€",
    salePrice: "0.60€",
  },
  {
    name: "Riz basmati",
    image: plate,
    price: "3.00€",
    salePrice: "1.50€",
  },
  // Ajoute autant de produits que tu veux
];

const ProductCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ]
  };

  return (
    <div className="px-8 max-w-7xl mx-auto mb-16">
      <Slider {...settings}>
        {mockProducts.map((product, idx) => (
          <div key={idx} className="p-4">
            <div className="bg-white shadow-md rounded-xl overflow-hidden text-center">
              <img src={product.image} alt={product.name} className="w-full h-40 object-contain" />
              <div className="p-4">
                <h3 className="text-[#3435FF] text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-500 line-through">{product.price}</p>
                <p className="text-rayonorange text-xl font-bold">{product.salePrice}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
