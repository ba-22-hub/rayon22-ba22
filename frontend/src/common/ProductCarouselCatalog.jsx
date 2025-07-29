import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


import Slider from "react-slick";

{/* TODO: Add here the real showcase products (the showcase isn't linked tho the database) */}

{/* CAROUSEL ARROWS */}
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
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="px-8 max-w-7xl mx-auto mb-16">
      <Slider {...settings}>
        {data.map((product, idx) => (
          <div key={idx} className="p-4">
            <div className="bg-white shadow-md rounded-xl overflow-hidden">
              <div className="p-4">
                <h3 className="text-[#3435FF] text-3xl font-semibold ml-0">{product.salePrice}</h3>
                <h3 className="text-[#ff6161] text-xs ml-0">Prix en magasin : {product.price}</h3>
              </div>
              <img src={product.image} alt={product.name} className="w-full h-40 object-contain" />
              <div className="p-4">
                <p className="text-[#3435FF] text-lg font-semibold">{product.name}</p>
                <p className="text-[#3435FF] text-xs">{product.weight}, {product.category}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ProductCarousel;
