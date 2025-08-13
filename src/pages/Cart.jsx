import { useState, useEffect, useRef } from 'react';
import { useAuthor } from '../context/AuthorContext.jsx'
import { useNavigate } from 'react-router-dom';
import { useCart } from "../context/CartContext.jsx";
import { supabase } from "../lib/supabaseClient";

// Importing common components
import FunctionButton from "../common/FunctionButton"
import PageButton from "@common/PageButton.jsx";
import Loading from '../common/Loading.jsx';

// Importing assets
import receipt from "../assets/Assets/ticket-caisse-ecriture.png"
import orangeLine from "../assets/Assets/Trait orange.png"
import orangeShape from "../assets/Assets/Coup crayon orange.svg"
import blueRayonShape from "../assets/Assets/Rayons traits bleus.svg"
import orangeCircle from "../assets/Assets/Cercle orange crayon.png"
import roundLogo from "../assets/logos/roundLogo.png"

/**
 * The Cart page.
 * @returns {React.ReactElement} Cart component.
 */


function Cart() {
    const [productsInCart, setProductsInCart] = useState([])
    const [productsPriceTotal, setProductsPriceTotal] = useState(0)
    const [productsWeightTotal, setProductsWeightTotal] = useState(0)
    const [productsNumberTotal, setProductsNumberTotal] = useState(0)
    const shippingCost = 1
    const isNotified = useRef(false)

    const { cart, setCart, client } = useCart()

    console.log(cart)

    let navigate = useNavigate()
    const { user, loading, hasRights } = useAuthor()

    useEffect(() => {
        // star author routine 
        if (loading) return; // no needs to exec the useEffect if the rights aren't known

        if (!user) { // user not login 
            navigate('/login')
            notify("Vous devez être connectés et avoir les droits pour passer commande")
        } else if (!hasRights) { // user hasn't rights
            notify("Vous n'avez pas (encore ?) les droits. Pour passer une commande, veuillez déposer un fichier dans votre espace compte")
            navigate('/account') // send the user to the previous page
        }
        // end author routine 

        // rest of the useEffect 


    }, [loading])

    // function to avoid double notification in the login routine
    function notify(message) {
        console.log(message, isNotified)
        if (isNotified.current) return;  // no need to notify again
        isNotified.current = true
        alert(message)
    }


    function roundTwoDigits(nb) {
        return Math.round(nb * 100) / 100
    }

    console.log("cart : " + cart)

    useEffect(() => {
        const fetchDataProductsInCart = async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .in("id", Object.keys(cart));
            if (error) console.error('Erreur de chargement des produits :', error);
            else
                setProductsInCart(data);
            console.log(data)
        };
        fetchDataProductsInCart();
    }, [cart]);

    useEffect(() => {
        if (productsInCart.length > 0) {
            updateTotals();
        }
    }, [productsInCart]);


    const updateTotals = () => {
        if (productsInCart.length > 0) {
            setProductsPriceTotal(roundTwoDigits(productsInCart.map((product) => (parseFloat(product.salePrice) * parseFloat(cart[product.id]))).reduce((priceTotal, price) => priceTotal + price)))
            setProductsWeightTotal(roundTwoDigits(productsInCart.map((product) => (parseFloat(product.weight) * parseFloat(cart[product.id]))).reduce((priceTotal, price) => priceTotal + price)))
            setProductsNumberTotal(Object.values(cart).reduce((acc, number) => acc + number, 0))
        }
    }

    function DisplayImage({ product }) {
        const [imageUrl, setImageUrl] = useState(null);

        useEffect(() => {
            async function fetchImage() {
                const { data, error } = await supabase
                    .storage
                    .from("images")
                    .download(product.image_name);

                if (error) {
                    console.error("Erreur lors du téléchargement de l'image " + product.image_name + " : ", error.message);
                    return
                }

                const url = URL.createObjectURL(data);
                setImageUrl(url);

            }

            fetchImage();
        }, [product.image_name]);

        return <>
            <img src={imageUrl || roundLogo} alt={product.name} className="flex-left w-[60%] object-contain" />
        </>
    }

    function displayProductOnReceipt(product, idx) {

        function DisplayButtons({ product }) {
            const AddToCart = () => {
                if (Object.keys(cart).includes(product.id)) {
                    // Product already in cart
                    setCart(prevData => ({
                        ...prevData,
                        [product.id]: prevData[product.id] + 1
                    }))
                }
                else {
                    // New product added to cart
                    setCart(prevData => ({
                        ...prevData,
                        [product.id]: 1
                    }))
                }
                updateTotals()
            }

            const RemoveFromCart = () => {
                if (Object.keys(cart).includes(product.id)) {   // Should always be true when function called
                    if (cart[product.id] <= 1) {
                        // Removing last item of this product from cart : product removed from cart
                        setCart(prevData => {
                            const newCart = { ...prevData };
                            delete newCart[product.id];
                            return newCart;
                        });
                    }
                    else {
                        setCart(prevData => ({
                            ...prevData,
                            [product.id]: prevData[product.id] - 1
                        }))
                    }
                }
                updateTotals()
            }

            if (cart[product.id] == 1) {
                return <div className="flex jusitfy-end">
                    {/* TRASH CAN BUTTON */}
                    <button type="button" className="text-white bg-[#FF8200] hover:bg-[#ff9800] rounded-full text-sm px-1 py-0.5 mb-2" onClick={RemoveFromCart}>
                        <svg viewBox="0 0 32 32" fill="currentColor" className="h-4 w-4">
                            <path fill="currentColor" d="M13.5 6.5V7h5v-.5a2.5 2.5 0 0 0-5 0Zm-2 .5v-.5a4.5 4.5 0 1 1 9 0V7H28a1 1 0 1 1 0 2h-1.508L24.6 25.568A5 5 0 0 1 19.63 30h-7.26a5 5 0 0 1-4.97-4.432L5.508 9H4a1 1 0 0 1 0-2h7.5Zm2.5 6.5a1 1 0 1 0-2 0v10a1 1 0 1 0 2 0v-10Zm5-1a1 1 0 0 0-1 1v10a1 1 0 1 0 2 0v-10a1 1 0 0 0-1-1Z" />
                        </svg>
                    </button>
                    <p className="text-[#3435FF] text-xl mr-1 ml-1 font-semibold">{cart[product.id]}</p>
                    <FunctionButton className="text-white bg-[#3435FF] hover:bg-[#5253ff] rounded-full text-sm px-2 py-0.5 mb-2 ml-0 text-right" buttonText="+" fun={AddToCart} />
                </div>
            }
            else if (cart[product.id] > 1) {
                return <div className="flex jusitfy-end">
                    {/* REGULAR MINUS BUTTON */}
                    <FunctionButton className="text-white bg-[#FF8200] hover:bg-[#ff9800] rounded-full text-sm px-2 py-0.5 mb-2" buttonText="-" fun={RemoveFromCart} />
                    <p className="text-[#3435FF] text-xl mr-1 ml-1 font-semibold">{cart[product.id]}</p>
                    <FunctionButton className="text-white bg-[#3435FF] hover:bg-[#5253ff] rounded-full text-sm px-2 py-0.5 mb-2 ml-0 text-right" buttonText="+" fun={AddToCart} />
                </div>
            }
        }

        if (Object.keys(cart).includes(product.id)) {
            return (
                <div key={idx} className="grid grid-cols-5 text-[#3435FF]">
                    <div className="col-span-1 col-start-1 content-center">
                        <DisplayImage product={product}></DisplayImage>
                    </div>
                    <div className="col-span-3 col-start-2 content-center">
                        <p className="text-2xl font-semibold">{product.name}</p>
                        <p className="text-s">{product.weight}g, {product.category}</p>
                        <DisplayButtons product={product} />
                    </div>
                    <div className="col-span-1 col-start-5 content-center">
                        <p className="text-3xl font-semibold text-right">{product.salePrice}€</p>
                    </div>
                </div>
            )
        }
    }

    function displayInfoOnCart() {

        return (
            <>
                <PageButton buttonText={'Voir tous nos produits...'} page={'/catalog'} className={"mt-0 mb-5 mx-10 text-xs text-rayonorange"} />
                <div className="grid grid-flow-col grid-rows-6 gris-cols-3 gap-4 text-[#3435FF] mx-10">
                    <div className="col-span-2 col-start-1 row-start-1 content-right">
                        Total produits
                    </div>
                    <div className="col-span-1 col-start-3 row-start-1 content-right">
                        {productsPriceTotal}€
                    </div>
                    <div className="col-span-2 col-start-1 row-start-2 content-right">
                        Poids total du colis
                    </div>
                    <div className="col-span-1 col-start-3 row-start-2 content-right">
                        {productsWeightTotal / 1000}kg
                    </div>
                    <div className="col-span-2 col-start-1 row-start-3 content-right">
                        Frais de transport
                    </div>
                    <div className="col-span-1 col-start-3 row-start-3 content-right">
                        {shippingCost}€
                    </div>
                    <div className="mt-8 text-4xl font-extrabold col-span-2 col-start-1 row-span-3 row-start-4 content-right">
                        <div className="relative">
                            <img src={orangeCircle}></img>
                            <div className="absolute top-4 left-7">Total</div>
                        </div>
                    </div>
                    <div className="mt-12 text-4xl font-extrabold col-span-1 col-start-3 row-span-3 row-start-4 content-right">
                        {productsPriceTotal + shippingCost}€
                    </div>
                </div>
                <FunctionButton buttonText={'Valider ma commande'} className={"mx-10 w-full mt-5 bg-[#FF8200] text-white px-8 py-3 rounded-lg font-mono text-2xl font-semibold shadow hover:bg-[#ff9800]"} />
            </>
        )
    }

    return (
        <>
            {!hasRights ? (
                <Loading />
            ) : (
                <>
                    {/* TITLE */}
                    <div className="ml-10 mb-6">
                        <h1 className="text-[#2E2EFF] text-7xl font-extrabold leading-tight">Panier</h1>
                        <img src={orangeLine}></img>
                    </div>

                    <div>
                        <img className="absolute top-28 right-20 w-[15%]" src={blueRayonShape}></img>
                        <img className="absolute left-28 w-[15%]" src={orangeShape}></img>
                        <div className="bg-no-repeat bg-contain m-auto w-[40%] relative text-[#2E2EFF] aspect-[1/2] align-center" style={{ backgroundImage: `url(${receipt})` }}>
                            {/* RECEIPT SECTION */}
                            {/* PRODUCTS IN CART */}
                            <div className="m-10">
                                <a className="text-[#3435FF] m-10"></a>
                                <div className="overflow-y-auto h-[70%] text-[#3435FF] m-5">
                                    {productsInCart.map((product, idx) => (displayProductOnReceipt(product, idx)))}
                                </div>
                            </div>

                            {/* INFO ON CART */}
                            <div className="text-xl ml-10 mr-28">
                                {displayInfoOnCart()}
                            </div>
                        </div>
                    </div>
                </>)}
        </>
    )
}

export default Cart