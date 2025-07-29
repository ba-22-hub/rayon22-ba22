// Importing common components
import LoremIpsum from "../common/LoremIpsum"

/**
 * The Catalog page.
 * @returns {React.ReactElement} Catalog component.
 */
function Catalog() {
    return (
        <>
            <h1 className="text-[#2E2EFF] text-7xl font-extrabold leading-tight ml-10">Nos produits</h1>

            {/* FILTER BAR */}
            <form class="ml-10 w-3/4">
                <div class="flex">
                    <button id="dropdown-button" data-dropdown-toggle="dropdown" class="h-6 font-extrabold shrink-0 z-10 inline-flex items-center py-1 px-1 text-sm text-centerrounded-s-lg hover:bg-[#ff9800] bg-[#FF8200]" type="button">Filtres<svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
            </svg></button>
                    <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44">
                        <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdown-button">
                        <li>
                            <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100">Élément 1</button>
                        </li>
                        </ul>
                    </div>
                    <div class="relative w-full">
                        <input type="search" id="search-dropdown" class="h-6 block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-[#2E2EFF] border border-gray-300" placeholder="Barre de recherche..." required />
                        <button type="submit" class="h-6 absolute top-0 end-0 p-1 text-sm font-medium h-full text-white bg-[#FF8200] rounded-e-lg border hover:bg-[#ff9800]">
                            <svg class="w-4 h-4" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                            <span class="sr-only">Search</span>
                        </button>
                    </div>
                </div>
            </form>

            <div className="my-4 mx-20 items-center justify-center text-3xl text-center">
                <p className="text-rayonorange mb-2 mx-20">
                À noter que les images des produits sont non contractuelles et peuvent ne pas refléter fidèlement les marques ou références effectivement proposées.
                </p>
            </div>
            {/* PASTA CAROUSEL */}
            <div class="flex items-start ...">  
                <p className="text-[#3435FF] text-4xl mb-2 mt-10 font-extrabold text-left">Pattes, riz, semoule...</p>
                <a className="mt-12 ml-5 bg-[#FF8200] text-white px-8 rounded-full font-mono text-base font-semibold shadow hover:bg-[#ff9800] transition-all">Voir +</a>
            </div>
            <p>Carousel Pattes, riz, semoule... ici</p>
            {/* VEGETABLE CAROUSEL */}
            <div class="flex items-start ...">  
                <p className="text-[#3435FF] text-4xl mb-2 mt-10 font-extrabold text-left">Conserves de légumes</p>
                <a className="mt-12 ml-5 bg-[#FF8200] text-white px-8 rounded-full font-mono text-base font-semibold shadow hover:bg-[#ff9800] transition-all">Voir +</a>
            </div>
            <p>Carousel Conserves de légumes ici</p>
            {/* FISH CAROUSEL */}
            <div class="flex items-start ...">  
                <p className="text-[#3435FF] text-4xl mb-2 mt-10 font-extrabold text-left">Conserves de poisson</p>
                <a className="mt-12 ml-5 bg-[#FF8200] text-white px-8 rounded-full font-mono text-base font-semibold shadow hover:bg-[#ff9800] transition-all">Voir +</a>
            </div>
            <p>Carousel Conserves de poisson ici</p>
            {/* HYGIENE CAROUSEL */}
            <div class="flex items-start ...">  
                <p className="text-[#3435FF] text-4xl mb-2 mt-10 font-extrabold text-left">Produit d'hygiène</p>
                <a className="mt-12 ml-5 bg-[#FF8200] text-white px-8 rounded-full font-mono text-base font-semibold shadow hover:bg-[#ff9800] transition-all">Voir +</a>
            </div>
            <p>Carousel Produit d'hygiène ici</p>
        </>
    )
}

export default Catalog