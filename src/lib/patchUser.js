import { supabase } from "@lib/supabaseClient";
import { Store } from 'react-notifications-component';

async function patchUser(userId, newUser) {
    try {
        const { data, error } = await supabase
            .from('User') // Nom de la table
            .update(newUser) // Colonnes à modifier
            .eq('id', userId) // Sélectionne le bon utilisateur
            .select(); // Renvoie les données mises à jour

        if (error) {
            console.error("Erreur lors de la mise à jour de l'utilisateur " + userId + " :", error);
            Store.addNotification({
                title: "Erreur lors de la mise à jour de l'utilisateur " + userId,
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
            return null;
        }

        if (!data || data.length === 0) {
            console.warn("Aucun utilisateur trouvé avec cet ID :", userId);
            Store.addNotification({
                title: "Aucun utilisateur trouvé avec l'ID :",
                message: userId,
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
            return null;
        }

        Store.addNotification({
            title: "Utilisateur mis à jour",
            message: data[0],
            type: "success",
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
        return data[0];
    } catch (err) {
        console.error("Erreur inattendue :", err);
        Store.addNotification({
            title: "Erreur inattendue",
            message: err.message,
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
        return null;
    }
}
export {patchUser}