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
    price: "0.50€",
    salePrice: "0.05€",
    weight: "500g",
    category: "féculent",
    nbInCart: 7,
  },
  {
    name: "Riz 10 minutes",
    image: roundLogo,
    price: "0.50€",
    salePrice: "0.10€",
    weight: "450g",
    category: "féculent",
    nbInCart: 0,
  },
  {
    name: "Lentilles cuisinées",
    image: roundLogo,
    price: "0.50€",
    salePrice: "0.05€",
    weight: "500g",
    category: "conserves",
    nbInCart: 0,
  },
  {
    name: "Haricot vert extra-fin",
    image: roundLogo,
    price: "1€",
    salePrice: "0.10€",
    weight: "500g",
    category: "conserves",
    nbInCart: 0,
  },
  {
    name: "Thon",
    image: roundLogo,
    price: "1.50€",
    salePrice: "0.15€",
    weight: "200g",
    category: "conserves",
    nbInCart: 0,
  },
  {
    name: "3 gratte éponge",
    image: roundLogo,
    price: "1.50€",
    salePrice: "0.15€",
    weight: "10g",
    category: "hygiène",
    nbInCart: 0,
  },
  {
    name: "Pâte torti",
    image: roundLogo,
    price: "0.50€",
    salePrice: "0.05€",
    weight: "500g",
    category: "féculent",
    nbInCart: 7,
  },
  {
    name: "Riz 10 minutes",
    image: roundLogo,
    price: "0.50€",
    salePrice: "0.10€",
    weight: "450g",
    category: "féculent",
    nbInCart: 0,
  },
  {
    name: "Lentilles cuisinées",
    image: roundLogo,
    price: "0.50€",
    salePrice: "0.05€",
    weight: "500g",
    category: "conserves",
    nbInCart: 0,
  },
];

function Catalog() {
    return (
        <>
            <h1 className="text-[#2E2EFF] text-7xl font-extrabold leading-tight ml-10 mb-6">Nos produits</h1>

            {/* FILTER BAR */}
            <form className="ml-10 w-3/4 mb-6">
                <div className="flex">
                    <button id="dropdown-button" data-dropdown-toggle="dropdown" className="h-6 font-extrabold shrink-0 z-10 inline-flex items-center py-1 px-1 text-sm text-centerrounded-s-lg hover:bg-[#ff9800] bg-[#FF8200]" type="button">Filtres<svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" d="m1 1 4 4 4-4"/>
            </svg></button>
                    <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44">
                        <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdown-button">
                        <li>
                            <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100">Élément 1</button>
                        </li>
                        </ul>
                    </div>
                    <div className="relative w-full">
                        <input type="search" id="search-dropdown" className="h-6 block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-[#2E2EFF] border border-gray-300" placeholder="Barre de recherche..." required />
                        <button type="submit" className="h-6 absolute top-0 end-0 p-1 text-sm font-medium h-full text-white bg-[#FF8200] rounded-e-lg border hover:bg-[#ff9800]">
                            <svg className="w-4 h-4" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-width="2.5" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </div>
            </form>

            <div className="my-4 items-center justify-center text-3xl text-center">
                <p className="m-auto text-center w-[60%] text-rayonorange mb-2">
                À noter que les images des produits sont non contractuelles et peuvent ne pas refléter fidèlement les marques ou références effectivement proposées.
                </p>
            </div>

            {/* PASTA CAROUSEL */}
            <div className="flex items-start ...">  
                <p className="ml-5 text-[#3435FF] text-4xl mb-2 mt-10 font-extrabold text-left">Pattes, riz, semoule...</p>
                <FunctionButton className="mt-12 ml-5 bg-[#FF8200] text-white px-8 rounded-full font-mono text-base font-semibold shadow hover:bg-[#ff9800] transition-all" buttonText="Voir +"/>
            </div>
            <ProductCarousel data={dataProductCarousel}/>

            {/* VEGETABLE CAROUSEL */}
            <div className="flex items-start ...">  
                <p className="ml-5 text-[#3435FF] text-4xl mb-2 mt-10 font-extrabold text-left">Conserves de légumes</p>
                <FunctionButton className="mt-12 ml-5 bg-[#FF8200] text-white px-8 rounded-full font-mono text-base font-semibold shadow hover:bg-[#ff9800] transition-all" buttonText="Voir +"/>
            </div>
            <ProductCarousel data={dataProductCarousel}/>

            {/* FISH CAROUSEL */}
            <div className="flex items-start ...">  
                <p className="ml-5 text-[#3435FF] text-4xl mb-2 mt-10 font-extrabold text-left">Conserves de poisson</p>
                <FunctionButton className="mt-12 ml-5 bg-[#FF8200] text-white px-8 rounded-full font-mono text-base font-semibold shadow hover:bg-[#ff9800] transition-all" buttonText="Voir +"/>
            </div>
            <ProductCarousel data={dataProductCarousel}/>

            {/* HYGIENE CAROUSEL */}
            <div className="flex items-start ...">  
                <p className="ml-5 text-[#3435FF] text-4xl mb-2 mt-10 font-extrabold text-left">Produit d'hygiène</p>
                <FunctionButton className="mt-12 ml-5 bg-[#FF8200] text-white px-8 rounded-full font-mono text-base font-semibold shadow hover:bg-[#ff9800] transition-all" buttonText="Voir +"/>
            </div>
            <ProductCarousel data={dataProductCarousel}/>
        </>
    )
}

export default Catalog