import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


import Slider from "react-slick";

{/* TODO: Add here the real showcase products (the showcase isn't linked tho the database) */}

function ProductCarousel({ data }) {
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
        {data.map((product, idx) => (
          <div key={idx} className="p-4">
            <div className="bg-white shadow-md rounded-xl overflow-hidden text-center">
              <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-contain" />
              <div className="p-4">
                <h3 className="text-[#3435FF] text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-500 line-through">{product.price || ''}€</p>
                <p className="text-rayonorange text-xl font-bold">{product.salePrice}€</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ProductCarousel;
