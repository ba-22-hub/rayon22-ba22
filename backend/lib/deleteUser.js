import { supabase } from "@lib/supabaseClient";

async function deleteUser(userId) {
  try {
    console.log("Suppression de l'utilisateur avec ID :", userId);

    const { data, error } = await supabase
      .from('User')        //table user
      .delete()
      .eq('id', userId);   // filter by id 

    if (error) {
      console.error("Erreur lors de la suppression :", error.message);
      return null;
    }

    console.log("Utilisateur supprimé :", data);
    return data;

  } catch (err) {
    console.error("Erreur inattendue :", err.message);
    return null;
  }
}

export { deleteUser };