// Importing dependencies
import { useEffect, useState } from "react";
import { useAuthor } from "@context/AuthorContext";
import { useNavigate } from "react-router-dom";
import { displayNotification } from '@lib/displayNotification.js';
import { supabase } from "@lib/supabaseClient";

// Importing common components
import FunctionButton from "@common/FunctionButton.jsx";
import Loading from "@common/Loading.jsx";

/**
 * Component to display and manage orders in the admin dashboard.
 * Allows admins to view, confirm delivery, and manage orders.
 * @returns {React.ReactElement} OrderTable component.
 */
function OrderTable() {
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    const { isAdmin, loading } = useAuthor();
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!isAdmin) {
            navigate("/admin");
            return;
        }
        fetchOrders();
    }, [loading]);

    const fetchOrders = async () => {
        setLoadingOrders(true);
        const { data, error } = await supabase
            .from("cart")
            .select(`
                id,
                client_id,
                content,
                price,
                delivered,
                created_at,
                User: client_id (
                  firstName,
                  lastName,
                  email
                )
            `)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Erreur chargement commandes:", error);
            displayNotification("Erreur de chargement", error.message, "danger")
        } else {
            setOrders(data);
        }
        setLoadingOrders(false);
    };

    const confirmDelivery = async (id) => {
        const { error } = await supabase.from("cart").update({ delivered: true }).eq("id", id);

        if (error) {
            console.error("Erreur livraison:", error);
            displayNotification("Erreur de confirmation", error.message, "danger")
        } else {
            displayNotification("Livraison confirmée", `Commande ${id.slice(0, 8)} marquée comme livrée ✅`, "success")
            fetchOrders();
        }
    };

    if (loading || loadingOrders) {
        return <Loading />;
    }

    const deliveredOrders = orders.filter((o) => o.delivered);
    const pendingOrders = orders.filter((o) => !o.delivered);

    // helper to display order content
    const renderContent = (content) => {
        try {
            const items = Array.isArray(content) ? content : JSON.parse(content);
            return (
                <ul className="list-disc pl-5 text-sm space-y-1">
                    {items.map((item) => (
                        <li key={item.id}>
                            {item.quantity} x {item.name} ({item.salePrice.toFixed(2)} €)
                        </li>
                    ))}
                </ul>
            );
        } catch (e) {
            return <pre className="text-xs">{JSON.stringify(content, null, 2)}</pre>;
        }
    };

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-2xl font-bold">Gestion des commandes</h2>

            {/* Commandes en attente */}
            <div>
                <h3 className="text-xl font-semibold mb-2">
                    Commandes en attente ({pendingOrders.length})
                </h3>
                {pendingOrders.length === 0 ? (
                    <p>Aucune commande en attente.</p>
                ) : (
                    pendingOrders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4 shadow bg-white space-y-2 mb-4">
                            <p className="text-sm text-gray-500">
                                Créée le {new Date(order.created_at).toLocaleString()} par{" "}
                                <strong>
                                    {order.User?.firstName} {order.User?.lastName?.toUpperCase()}
                                </strong>{" "}
                                ({order.User?.email})
                            </p>
                            {renderContent(order.content)}
                            <p className="font-semibold">Prix : {order.price.toFixed(2)} €</p>
                            <FunctionButton
                                fun={() => confirmDelivery(order.id)}
                                buttonText="Livraison confirmée"
                                className="text-white bg-green px-3 py-1 rounded hover:bg-green"
                            />
                        </div>
                    ))
                )}
            </div>

            {/* Commandes livrées */}
            <div>
                <h3 className="text-xl font-semibold mb-2">
                    Commandes livrées ({deliveredOrders.length})
                </h3>
                {deliveredOrders.length === 0 ? (
                    <p>Aucune commande livrée.</p>
                ) : (
                    deliveredOrders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4 shadow bg-gray-50 space-y-2 mb-4">
                            <p className="text-sm text-gray-500">
                                Livrée (créée le {new Date(order.created_at).toLocaleString()}) par{" "}
                                <strong>
                                    {order.User?.firstName} {order.User?.lastName?.toUpperCase()}
                                </strong>{" "}
                                ({order.User?.email})
                            </p>
                            {renderContent(order.content)}
                            <p className="font-semibold">Prix : {order.price.toFixed(2)} €</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default OrderTable;
