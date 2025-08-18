// Importing dependencies
import { useEffect, useRef } from "react";
import { supabase } from "@lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { displayNotification } from '@lib/displayNotification.js';

// Importing common components
import Loading from "@common/Loading.jsx";

function PaymentSuccess() {
    const navigate = useNavigate();
    const hasRun = useRef(false);

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

                const { error: insertError } = await supabase
                    .from("cart")
                    .insert(data.cartToValidate);

                if (insertError) {
                    console.error("💥 Erreur insertion commande :", insertError);
                } else {
                    console.log("🛒 Commande insérée avec succès !");
                }

                // Empty the cart in localStorage
                localStorage.removeItem(data.cartToValidate.client_id);
            } else {
                console.warn("⚠️ Paiement non validé ou panier manquant.");
            }

            // Finale redirection
            navigate("/catalog");
        };

        confirmPayment();
    }, [navigate]);

    return <Loading text="Validation du paiement en cours..."></Loading>;
}

export default PaymentSuccess;
