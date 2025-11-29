// Importing dependencies
import { useEffect, useRef, useState } from "react";
import { supabase } from "@lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useCart } from "@context/CartContext.jsx";
import { displayNotification } from '@lib/displayNotification.jsx';

// Importing common components
import Loading from "@common/Loading.jsx";

function PaymentSuccess() {
    const navigate = useNavigate();
    const hasRun = useRef(false);
    const { cart, setCart } = useCart()

    function roundTwoDigits(nb) {
        return Math.round(nb * 100) / 100
    }

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const confirmPayment = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const session_id = urlParams.get("session_id");

            if (!session_id) {
                console.error("❌ Aucun session_id dans l'URL");
                navigate("/cart");
                return;
            }

            console.log("🔍 Vérification paiement pour session :", session_id);

            // Invoke the Supabase edge function to retrieve the checkout session
            const { data, error } = await supabase.functions.invoke("retrieve-checkout-session", {
                body: { session_id }
            });

            console.log("📦 Données retournées par retrieve-checkout-session :", data);

            if (error) {
                console.error("💥 Erreur récupération session Stripe :", error);
                navigate("/cart");
                return;
            }

            if (data?.payment_status === "paid" && data?.cartToValidate) {
                console.log("✅ Paiement validé, insertion dans la base...");
                displayNotification("Paiement validé", "", "success")

                // Fecthing old counters
                const { data: dataOldCounters, error: errorOldCounters } = await supabase  
                    .from('User')  
                    .select('current_weight, current_price, current_order')  
                    .eq('id', data.cartToValidate.client_id)
                    .single();

                if (errorOldCounters) {
                    console.error("Échec lors de la récupération des compteurs du compte", errorOldCounters.message)
                    displayNotification("Échec lors de la récupération des compteurs du compte", "" + errorOldCounters.message, "danger")
                    return;
                }

                const oldWeight = dataOldCounters.current_weight
                const oldOrder = dataOldCounters.current_order
                const oldPrice = dataOldCounters.current_price

                // Computing new cart counters values
                const cartWeight = roundTwoDigits(data.cartToValidate.content.map((product) => (parseFloat(product.weight) * parseFloat(product.quantity))).reduce((weightTotal, weight) => weightTotal + weight))
                const cartOrder = roundTwoDigits(data.cartToValidate.content.map((product) => (parseFloat(product.quantity))).reduce((orderTotal, order) => orderTotal + order))
                const cartPrice = roundTwoDigits(data.cartToValidate.content.map((product) => (parseFloat(product.salePrice) * parseFloat(product.quantity))).reduce((priceTotal, price) => priceTotal + price))

                const { data:insertedCartId, error: insertError } = await supabase
                    .from("cart")
                    .insert(data.cartToValidate)
                    .select("id")
                    .single();

                if (insertError) {
                    console.error("💥 Erreur insertion commande :", insertError);
                } else {
                    setCart(prevData => ({
                        ...prevData,
                        "id": insertedCartId.id
                    }))
                    console.log("🛒 Commande insérée avec succès !");
                }

                const { error: updateError } = await supabase
                    .from("User")
                    .update({ current_weight: oldWeight + cartWeight, current_price: oldPrice + cartPrice, current_order: oldOrder + cartOrder })
                    .eq('id', data.cartToValidate.client_id)

                if (updateError) {
                    console.error("Échec de mise à jour des compteurs liés au compte", updateError.message)
                    displayNotification("Échec de mise à jour des compteurs liés au compte", "" + updateError.message, "danger")
                    return;
                }

                // Empty the cart in localStorage
                localStorage.removeItem(data.cartToValidate.client_id);
            } else {
                console.warn("⚠️ Paiement non validé ou panier manquant.");
            }

            // Finale redirection
            navigate("/chose-pickup-point")
        };

        confirmPayment();
    }, [navigate]);

    return <Loading text="Validation du paiement en cours..."></Loading>;
}

export default PaymentSuccess;
