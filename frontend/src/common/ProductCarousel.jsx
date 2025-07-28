import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


import Slider from "react-slick";
import pasta from "../assets/Photos/Tortis.png"
import rice from "../assets/Photos/Riz.png"
import lentil from "../assets/Photos/Lentilles.png"
import bean from "../assets/Photos/Haricot.png"
import tuna from "../assets/Photos/Thon.png"
import sponges from "../assets/Photos/Eponges.png"

{/* TODO: Add here the real showcase products (the showcase isn't linked tho the database) */}

const showcaseProducts = [
  {
    name: "Pâte torti",
    image: pasta,
    price: "0.50€",
    salePrice: "0.05€",
  },
  {
    name: "Riz 10 minutes",
    image: rice,
    price: "0.50€",
    salePrice: "0.10€",
  },
  {
    name: "Lentilles cuisinées",
    image: lentil,
    price: "0.50€",
    salePrice: "0.05€",
  },
  {
    name: "Haricot vert extra-fin",
    image: bean,
    price: "1€",
    salePrice: "0.10€",
  },
  {
    name: "Thon",
    image: tuna,
    price: "1.50€",
    salePrice: "0.15€",
  },
  {
    name: "3 gratte éponge",
    image: sponges,
    price: "1.50€",
    salePrice: "0.15€",
  },
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
        {showcaseProducts.map((product, idx) => (
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
