// Importing dependencies
import React, { useEffect, useState } from 'react';
import { supabase } from '@lib/supabaseClient.js';
import { Store } from 'react-notifications-component';

// Importing common components
import ProductCarousel from "../common/ProductCarouselCatalog"

/**
 * The Catalog page.
 * @returns {React.ReactElement} Catalog component.
 */

const SearchBar = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [update, setUpdate] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      if (error) {
        Store.addNotification({
          title: "Erreur lors du téléchargement des produits",
          message: error.message,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
            pauseOnHover: true,
            showIcon: true
          }
        });
      } else {
        const productsWithImages = await Promise.all(
          data.map(async product => {
            const { data: imgData, error: imgError } = await supabase
              .storage
              .from("images")
              .download(product.image_name);

            if (imgError) {
              Store.addNotification({
                title: "Erreur lors du téléchargement de l'image " + product.image_name,
                message: imgError.message,
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true,
                  pauseOnHover: true,
                  showIcon: true
                }
              });
            } else {
              product.imageUrl = URL.createObjectURL(imgData);
            }
            return product;
          })
        );

        setProducts(productsWithImages);
      }
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
  const categoriesList = ["légumes", "fruits", "féculents", "conserves", "hygiène", "autre"]
  const [productsByCategory, setProductsByCategory] = useState({})

  useEffect(() => {
    const fetchProductsFromCategory = async (category) => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq('category', category);
      if (error) {
        Store.addNotification({
          title: "Erreur lors du téléchargement des produits",
          message: error.message,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
            pauseOnHover: true,
            showIcon: true
          }
        });
      } else {
        const productsWithImages = await Promise.all(
          data.map(async product => {
            const { data: imgData, error: imgError } = await supabase
              .storage
              .from("images")
              .download(product.image_name);

            if (imgError) {
              Store.addNotification({
                title: "Erreur lors du téléchargement de l'image " + product.image_name,
                message: imgError.message,
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true,
                  pauseOnHover: true,
                  showIcon: true
                }
              });
            } else {
              product.imageUrl = URL.createObjectURL(imgData);
            }
            return product;
          })
        );

        setProductsByCategory(prevData => ({
          ...prevData,
          [category]: productsWithImages
        }));
      }
    };

    const fetchProductsByCategories = async () => {
      {
        categoriesList.map((category) => (
          fetchProductsFromCategory(category)
        ))
      }
    }
    fetchProductsByCategories()
  }, []);

  return (
    <>
      <h1 className="text-[#2E2EFF] text-7xl font-extrabold leading-tight ml-10 mb-6">Nos produits</h1>

      <SearchBar></SearchBar>

      <div className="my-4 items-center justify-center text-3xl text-center">
        <p className="m-auto text-center w-[60%] text-rayonorange mb-2">
          À noter que les images des produits sont non contractuelles et peuvent ne pas refléter fidèlement les marques ou références effectivement proposées.
        </p>
      </div>

      <div>
        {categoriesList.map((category) => {
          const products = productsByCategory[category] || [];
          if (products.length > 0) {
            return <div key={category}>
              <div className="flex items-start ...">
                <p className="ml-5 text-[#3435FF] text-4xl mb-2 mt-10 font-extrabold text-left">{category.slice(0, 1).toUpperCase() + category.slice(1, category.length)}</p>
              </div>
              <ProductCarousel data={products} />
            </div>
          }
          else {
            return null
          }
        })}
      </div>
    </>
  )
}

export default Catalog