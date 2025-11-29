import { supabase, supabaseAdmin } from "@lib/supabaseClient";
import { displayNotification } from '@lib/displayNotification.jsx'

async function deleteUser(userId) {
  try {
    // delete from the SQL User Table
    const { data, error } = await supabase
      .from('User')        //table user
      .delete()
      .eq('id', userId);   // filter by id 

    if (error) {
      displayNotification("Erreur lors de la suppression de l'utilisateur avec ID : " + userId, error.message, "danger")
      return null;
    }

    // delete from the auth.user table 
    const { data: authData, error: authError } = await supabaseAdmin
      .auth
      .admin
      .deleteUser(userId); // ID dans auth.users

    if (authError) {
      throw new Error("Erreur suppression auth.users : " + authError.message);
    }

    displayNotification("Utilisateur supprimé", "ID : " + userId, "success")
    return data;

  } catch (err) {
    displayNotification("Erreur inattendue", err.message, "danger")
    console.error("Erreur inattendue :", err);
    return null;
  }
}

export { deleteUser };