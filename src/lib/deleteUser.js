import { supabase, supabaseAdmin } from "@lib/supabaseClient";

async function deleteUser(userId) {
  try {
    console.log("Suppression de l'utilisateur avec ID :", userId);

    // delete from the SQL User Table
    const { data, error } = await supabase
      .from('User')        //table user
      .delete()
      .eq('id', userId);   // filter by id 

    if (error) {
      console.error("Erreur lors de la suppression :", error.message);
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

    console.log("Utilisateur supprimé :", data);
    return data;

  } catch (err) {
    console.error("Erreur inattendue :", err.message);
    return null;
  }
}

export { deleteUser };