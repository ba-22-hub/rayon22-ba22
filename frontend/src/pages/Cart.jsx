import { useState } from 'react';

// Importing common components
import FunctionButton from "../common/FunctionButton"
import LoremIpsum from "../common/LoremIpsum"

// Importing assets
import receipt from "../assets/Photos/ticket_caisse.png"
import orangeLine from "../assets/shapes/traitOrange.png"
import orangeShape from "../assets/shapes/coupCrayonOrange.png"
import blueRayonShape from "../assets/shapes/rayonsTraitsBleu.png"
import pasta from "../assets/Photos/Tortis.png"
import bean from "../assets/Photos/Haricot.png"
import tuna from "../assets/Photos/Thon.png"

/**
 * The Cart page.
 * @returns {React.ReactElement} Cart component.
 */

const productsInCart = [
    {
        name: "Pâte torti",
        image: pasta,
        price: "0.50€",
        salePrice: "0.05€",
        weight: "500g",
        category: "féculent",
        nbInCart: 1,
    },
    {
        name: "Haricot vert extra-fin",
        image: bean,
        price: "1€",
        salePrice: "0.10€",
        weight: "500g",
        category: "conserves",
        nbInCart: 3,
    },
    {
        name: "Thon",
        image: tuna,
        price: "1.50€",
        salePrice: "0.15€",
        weight: "200g",
        category: "conserves",
        nbInCart: 1,
    },
];

function displayProductOnReceipt(product) {
    const [nbProd, setNbProd] = useState(product.nbInCart)

    function DisplayButtons({ product }) {
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

        if (nbProd == 1) {
            return <div className="flex jusitfy-end">
                <button type="button" class="text-white bg-[#FF8200] hover:bg-[#ff9800] rounded-full text-sm px-1 py-0.5 mb-2" onClick={RemoveFromCart}>
                    <svg viewBox="0 0 32 32" fill="currentColor" class="h-4 w-4">
                        <path fill="currentColor" d="M13.5 6.5V7h5v-.5a2.5 2.5 0 0 0-5 0Zm-2 .5v-.5a4.5 4.5 0 1 1 9 0V7H28a1 1 0 1 1 0 2h-1.508L24.6 25.568A5 5 0 0 1 19.63 30h-7.26a5 5 0 0 1-4.97-4.432L5.508 9H4a1 1 0 0 1 0-2h7.5Zm2.5 6.5a1 1 0 1 0-2 0v10a1 1 0 1 0 2 0v-10Zm5-1a1 1 0 0 0-1 1v10a1 1 0 1 0 2 0v-10a1 1 0 0 0-1-1Z" />
                    </svg>
                </button>
                <p className="text-[#3435FF] text-xl mr-1 ml-1 font-semibold">{nbProd}</p>
                <FunctionButton className="text-white bg-[#3435FF] hover:bg-[#5253ff] rounded-full text-sm px-2 py-0.5 mb-2 ml-0 text-right" buttonText="+" fun={AddToCart} />
            </div>
        }
        else if (nbProd > 1) {
            return <div className="flex jusitfy-end">
                <FunctionButton className="text-white bg-[#FF8200] hover:bg-[#ff9800] rounded-full text-sm px-2 py-0.5 mb-2" buttonText="-" fun={RemoveFromCart} />
                <p className="text-[#3435FF] text-xl mr-1 ml-1 font-semibold">{nbProd}</p>
                <FunctionButton className="text-white bg-[#3435FF] hover:bg-[#5253ff] rounded-full text-sm px-2 py-0.5 mb-2 ml-0 text-right" buttonText="+" fun={AddToCart} />
            </div>
        }
    }

    if (nbProd > 0) {
        return (
            <>
                <div className="grid grid-cols-5 text-[#3435FF] m-5">
                    <div className="col-span-1 col-start-1 content-center">
                        <img src={product.image} alt={product.name} className="flex-left w-[60%] object-contain" />
                    </div>
                    <div className="col-span-3 col-start-2 content-center">
                        <p className="text-xl font-semibold">{product.name}</p>
                        <p className="text-s">{product.weight}, {product.category}</p>
                        <DisplayButtons product={product} />
                    </div>
                    <div className="col-span-1 col-start-5 content-center">
                        <p className="text-xl font-semibold text-right">{product.salePrice}</p>
                    </div>
                </div>
            </>
        )
    }
}

function Cart() {
    return (
        <>
            {/* TITLE */}
            <div className=" ml-10 mb-6">
                <h1 className="text-[#2E2EFF] text-7xl font-extrabold leading-tight">Panier</h1>
                <img src={orangeLine}></img>
            </div>

            {/* RECEIPT SECTION */}
            <div className="m-auto w-[40%] h-[40%] relative text-[#2E2EFF] min-h-screen align-center">
                {/* RECEIPT */}
                <div className="absolute inset-0 bg-no-repeat bg-contain" style={{ backgroundImage: `url(${receipt})` }}></div>

                {/* PRODUCTS IN CART */}
                <div className="relative m-10">
                    <a className="m-10"></a>
                    {productsInCart.map((product) => (displayProductOnReceipt(product)))}
                </div>
            </div>
        </>
    )
}

export default Cart