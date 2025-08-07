// Importing dependencies
import React, { useEffect, useState } from 'react';
import { supabase } from '@lib/supabaseClient.js';
import { deleteUser } from '@lib/deleteUser';
import { patchUser } from '@lib/patchUser';

// Importing common components
import ProductCarousel from "../common/ProductCarouselCatalog"
import FunctionButton from "../common/FunctionButton"

// Importing assets
import roundLogo from "../assets/logos/roundLogo.png"

/**
 * The Catalog page.
 * @returns {React.ReactElement} Catalog component.
 */

const dataProductCarousel = [
  {
    name: "Pâte torti",
    image: roundLogo,
    price: "0.50",
    salePrice: "0.05",
    weight: "500",
    category: "féculent",
    nbInCart: 7,
  },
  {
    name: "Riz 10 minutes",
    image: roundLogo,
    price: "0.50",
    salePrice: "0.10",
    weight: "450",
    category: "féculent",
    nbInCart: 0,
  },
  {
    name: "Lentilles cuisinées",
    image: roundLogo,
    price: "0.50",
    salePrice: "0.05",
    weight: "500",
    category: "conserves",
    nbInCart: 0,
  },
  {
    name: "Haricot vert extra-fin",
    image: roundLogo,
    price: "1",
    salePrice: "0.10",
    weight: "500",
    category: "conserves",
    nbInCart: 0,
  },
  {
    name: "Thon",
    image: roundLogo,
    price: "1.50",
    salePrice: "0.15",
    weight: "200",
    category: "conserves",
    nbInCart: 0,
  },
  {
    name: "3 gratte éponge",
    image: roundLogo,
    price: "1.50",
    salePrice: "0.15",
    weight: "10",
    category: "hygiène",
    nbInCart: 0,
  },
  {
    name: "Pâte torti",
    image: roundLogo,
    price: "0.50",
    salePrice: "0.05",
    weight: "500",
    category: "féculent",
    nbInCart: 7,
  },
  {
    name: "Riz 10 minutes",
    image: roundLogo,
    price: "0.50",
    salePrice: "0.10",
    weight: "450",
    category: "féculent",
    nbInCart: 0,
  },
  {
    name: "Lentilles cuisinées",
    image: roundLogo,
    price: "0.50",
    salePrice: "0.05",
    weight: "500",
    category: "conserves",
    nbInCart: 0,
  },
];

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
        <p className="text-[#3435FF] text-xs">{product.weight}g, {product.category}</p>
      </div>
    </div>
  </>
}

const SearchBar = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [update, setUpdate] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('Products').select('*');
      if (error) console.error('Erreur de chargement des produits :', error);
      else
        setProducts(data);
      console.log(data)
    };
    fetchProducts()
  }, [update]);

  const filteredProducts = products.filter(product =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <input
        type="text"
        placeholder="Rechercher par nom ou catégorie"
        className="mb-6 px-4 py-2 border border-gray-300 rounded w-full border-[#2E2EFF]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

        <ProductCarousel data={filteredProducts}></ProductCarousel>
    </div>
  );
}

function Catalog() {
  return (
    <>
      <h1 className="text-[#2E2EFF] text-7xl font-extrabold leading-tight ml-10 mb-6">Nos produits</h1>

      <SearchBar></SearchBar>

      <div className="my-4 items-center justify-center text-3xl text-center">
        <p className="m-auto text-center w-[60%] text-rayonorange mb-2">
          À noter que les images des produits sont non contractuelles et peuvent ne pas refléter fidèlement les marques ou références effectivement proposées.
        </p>
      </div>

      {/* PASTA CAROUSEL */}
      <div className="flex items-start ...">
        <p className="ml-5 text-[#3435FF] text-4xl mb-2 mt-10 font-extrabold text-left">Pâtes, riz, semoule...</p>
        <FunctionButton className="mt-12 ml-5 bg-[#FF8200] text-white px-8 rounded-full font-mono text-base font-semibold shadow hover:bg-[#ff9800] transition-all" buttonText="Voir +" />
      </div>
      <ProductCarousel data={dataProductCarousel} />

      {/* VEGETABLE CAROUSEL */}
      <div className="flex items-start ...">
        <p className="ml-5 text-[#3435FF] text-4xl mb-2 mt-10 font-extrabold text-left">Conserves de légumes</p>
        <FunctionButton className="mt-12 ml-5 bg-[#FF8200] text-white px-8 rounded-full font-mono text-base font-semibold shadow hover:bg-[#ff9800] transition-all" buttonText="Voir +" />
      </div>
      <ProductCarousel data={dataProductCarousel} />

      {/* FISH CAROUSEL */}
      <div className="flex items-start ...">
        <p className="ml-5 text-[#3435FF] text-4xl mb-2 mt-10 font-extrabold text-left">Conserves de poisson</p>
        <FunctionButton className="mt-12 ml-5 bg-[#FF8200] text-white px-8 rounded-full font-mono text-base font-semibold shadow hover:bg-[#ff9800] transition-all" buttonText="Voir +" />
      </div>
      <ProductCarousel data={dataProductCarousel} />

      {/* HYGIENE CAROUSEL */}
      <div className="flex items-start ...">
        <p className="ml-5 text-[#3435FF] text-4xl mb-2 mt-10 font-extrabold text-left">Produit d'hygiène</p>
        <FunctionButton className="mt-12 ml-5 bg-[#FF8200] text-white px-8 rounded-full font-mono text-base font-semibold shadow hover:bg-[#ff9800] transition-all" buttonText="Voir +" />
      </div>
      <ProductCarousel data={dataProductCarousel} />
    </>
  )
}

export default Catalog