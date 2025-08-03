import { supabase } from "@lib/supabaseClient";

async function patchUser(userId, newUser) {
    try {
        console.log("Mise à jour de l'utilisateur :", userId, newUser);

        const { data, error } = await supabase
            .from('User') // Nom de la table
            .update(newUser) // Colonnes à modifier
            .eq('id', userId) // Sélectionne le bon utilisateur
            .select(); // Renvoie les données mises à jour

        if (error) {
            console.error("Erreur lors de la mise à jour :", error.message);
            return null;
        }

        if (!data || data.length === 0) {
            console.warn("Aucun utilisateur trouvé avec cet ID :", userId);
            return null;
        }

        console.log("Utilisateur mis à jour :", data[0]);
        return data[0];
    } catch (err) {
        console.error("Erreur inattendue :", err.message);
        return null;
    }
}
export {patchUser}