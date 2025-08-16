import { useState, useEffect, useRef } from 'react';
import { useAuthor } from '../context/AuthorContext.jsx'
import { useNavigate } from 'react-router-dom';
import { useCart } from "../context/CartContext.jsx";
import { supabase } from "@lib/supabaseClient";
import { stripePromise } from '@lib/stripeClient.js'
import { Store } from 'react-notifications-component';

// Importing common components
import FunctionButton from "@common/FunctionButton"
import PageButton from "@common/PageButton.jsx";
import Loading from '@common/Loading.jsx';

// Importing assets
import receipt from "../assets/Assets/ticket-caisse-ecriture.png"
import orangeLine from "../assets/Assets/Trait orange.png"
import orangeShape from "../assets/Assets/Coup crayon orange.svg"
import blueRayonShape from "../assets/Assets/Rayons traits bleus.svg"
import orangeCircle from "../assets/Assets/Cercle orange crayon.png"
import roundLogo from "../assets/logos/roundLogo.png"

// Importing styles
import 'react-notifications-component/dist/theme.css'

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

    const { user, loading, hasRights } = useAuthor()
    const { cart, setCart } = useCart()

    let navigate = useNavigate()

    useEffect(() => {
        // star author routine 
        if (loading) return; // no needs to exec the useEffect if the rights aren't known

        if (!user) { // user not login 
            navigate('/login')
            notify("Vous devez être connectés et avoir les droits pour passer commande")
        }
        else if (!hasRights) { // user doesn't have rights
            notify("Vous n'avez pas (encore ?) les droits. Pour passer une commande, veuillez déposer un fichier dans votre espace compte")
            navigate('/account') // send the user to the previous page
        }
        // end author routine 

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

    useEffect(() => {
        const fetchDataProductsInCart = async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .in("id", Object.keys(cart));
            if (error) {
                Store.addNotification({
                    title: "Erreur de chargement des produits",
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
                                title: "Erreur de chargement de l'image : " + product.image_name,
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

                setProductsInCart(productsWithImages);
            }
        };
        fetchDataProductsInCart();
    }, [cart]);

    useEffect(() => {
        updateTotals();
    }, [productsInCart]);


    const updateTotals = () => {
        if (productsInCart.length > 0) {
            setProductsPriceTotal(roundTwoDigits(productsInCart.map((product) => (parseFloat(product.salePrice) * parseFloat(cart[product.id]))).reduce((priceTotal, price) => priceTotal + price)))
            setProductsWeightTotal(roundTwoDigits(productsInCart.map((product) => (parseFloat(product.weight) * parseFloat(cart[product.id]))).reduce((weightTotal, weight) => weightTotal + weight)))
            setProductsNumberTotal(Object.values(cart).reduce((acc, number) => acc + number, 0))
        } else {
            setProductsPriceTotal(0)
            setProductsWeightTotal(0)
            setProductsNumberTotal(0)
        }
    }

    async function handleValidate() {
        if (Object.keys(cart).length === 0) {
            Store.addNotification({
                title: "Échec de validation du panier",
                message: "Le panier est vide",
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
            return;
        }

        // Vérifications limites utilisateur
        const { data: userData, error: userError } = await supabase
            .from("User")
            .select("weight_limit, current_weight, price_limit, current_price, order_limit, current_order")
            .eq('id', user.id)
            .single();

        if (userError) {
            Store.addNotification({
                title: "Échec de validation du panier",
                message: "Erreur lors du chargement des limites liées à votre compte : " + error.message,
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
            return;
        }

        const limits = userData;
        const isRespectedLimit = (limit, currentAmount, newAmount) =>
            !limit || (currentAmount + newAmount) <= limit;

        const productsWeightTotal = productsInCart
            .map(p => parseFloat(p.weight) * cart[p.id])
            .reduce((a, b) => a + b, 0);

        const productsPriceTotal = productsInCart
            .map(p => parseFloat(p.salePrice) * cart[p.id])
            .reduce((a, b) => a + b, 0);

        const productsNumberTotal = Object.values(cart).reduce((a, b) => a + b, 0);

        if (limits.weight_limit && !isRespectedLimit(limits.weight_limit, limits.current_weight, productsWeightTotal)) {
            Store.addNotification({
                title: "Échec de validation du panier",
                message: "Condition de poids non respectée : Seulement " + (limits.weight_limit - limits.current_weight) / 1000 + "kg d'achats possibles restants sur votre compte ce mois-ci.",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 0,
                    onScreen: true,
                    pauseOnHover: true,
                    showIcon: true
                }
            });
            return;
        }
        if (limits.price_limit && !isRespectedLimit(limits.price_limit, limits.current_price, productsPriceTotal)) {
            Store.addNotification({
                title: "Échec de validation du panier",
                message: "Condition de prix non respectée : Seulement " + (limits.price_limit - limits.current_price) + "€ d'achats possibles restants sur votre compte ce mois-ci.",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 0,
                    onScreen: true,
                    pauseOnHover: true,
                    showIcon: true
                }
            });
            return;
        }
        if (limits.order_limit && !isRespectedLimit(limits.order_limit, limits.current_order, productsNumberTotal)) {
            Store.addNotification({
                title: "Échec de validation du panier",
                message: "Condition de nombre de produits non respectée : Seulement " + (limits.order_limit - limits.current_order) + " achats possibles restants sur votre compte ce mois-ci.",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 0,
                    onScreen: true,
                    pauseOnHover: true,
                    showIcon: true
                }
            });
            return;
        }

        // Vérifier stock
        const areAvailableProducts = productsInCart.every(p => cart[p.id] <= p.stock);
        if (!areAvailableProducts) {
            Store.addNotification({
                title: "Échec de validation du panier",
                message: "Stock de " + product.name + " insuffisant",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 7000,
                    onScreen: true,
                    pauseOnHover: true,
                    showIcon: true
                }
            });
            return;
        }

        try {
            // We invoke the supabase edge function to create the Stripe checkout session
            const { data, error } = await supabase.functions.invoke("create-checkout-session", {
                body: {
                    cart: productsInCart.map(p => ({
                        id: p.id,
                        name: p.name,
                        salePrice: p.salePrice,
                        quantity: cart[p.id]
                    })),
                    userId: user.id,
                    successUrl: `${window.location.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
                    cancelUrl: `${window.location.origin}/cart`,
                }
            });

            if (error) {
                console.error("Erreur fonction edge Stripe :", error);
                return;
            }

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error("Aucune URL Stripe renvoyée par la fonction edge.");
            }
        } catch (err) {
            console.error("Erreur Stripe :", err);
        }
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
                        <img src={product.imageUrl || roundLogo} alt={product.name} className="ml-2 flex-left w-[60%] object-contain" />
                    </div>
                    <div className="col-span-3 col-start-2 content-center">
                        <p className="text-2xl font-semibold">{product.name}</p>
                        <p className="text-s">{product.weight}g, {product.category}</p>
                        <DisplayButtons product={product} />
                    </div>
                    <div className="col-span-1 col-start-5 content-center">
                        <p className="text-3xl font-semibold text-right mr-2">{product.salePrice}€</p>
                    </div>
                </div>
            )
        }
    }

    function displayInfoOnCart() {

        return (
            <>
                <PageButton buttonText={'Voir tous nos produits...'} page={'/catalog'} className={"mt-0 mb-5 mx-10 text-xs text-rayonorange"} />
                <div className="grid grid-flow-col grid-rows-7 gris-cols-3 gap-4 text-[#3435FF] mx-10">
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
                    <div className="col-span-2 col-start-1 row-start-4 content-right">
                        Nombre de produits
                    </div>
                    <div className="col-span-1 col-start-3 row-start-4 content-right">
                        {productsNumberTotal}
                    </div>
                    <div className="mt-8 text-4xl font-extrabold col-span-2 col-start-1 row-span-3 row-start-5 content-right">
                        <div className="relative">
                            <img src={orangeCircle}></img>
                            <div className="absolute top-4 left-7">Total</div>
                        </div>
                    </div>
                    <div className="mt-12 text-4xl font-extrabold col-span-1 col-start-3 row-span-3 row-start-5 content-right">
                        {productsPriceTotal + shippingCost}€
                    </div>
                </div>
                <FunctionButton
                    buttonText={'Valider ma commande'}
                    className={`mx-4 sm:mx-10 w-full mt-4 sm:mt-5 px-4 sm:px-8 py-2 sm:py-3 rounded-lg font-mono text-lg sm:text-xl md:text-2xl font-semibold shadow ${Object.keys(cart).length === 0
                        ? 'bg-[#878787] text-white'
                        : 'bg-[#FF8200] text-white hover:bg-[#ff9800]'
                        }`}
                    fun={handleValidate}
                />
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

                        <div className="relative bg-no-repeat bg-cover mx-auto" style={{ backgroundImage: `url(${receipt})`, aspectRatio: '1/2', width: '700px' }}>

                            {/* PRODUCTS IN CART */}
                            <div className="m-10">
                                <a className="text-[#3435FF] m-10"></a>
                                <div className="overflow-y-auto h-[700px] text-[#3435FF] m-5">
                                    {productsInCart.map((product, idx) => (displayProductOnReceipt(product, idx)))}
                                </div>
                            </div>

                            {/* INFO ON CART */}
                            <div className="absolute inset-x-0 text-xl h-16 ml-10 mr-28">
                                {displayInfoOnCart(productsInCart)}
                            </div>
                        </div>


                    </div>
                </>)}
        </>
    )
}

export default Cart