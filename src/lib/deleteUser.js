import { supabase, supabaseAdmin } from "@lib/supabaseClient";
import { Store } from 'react-notifications-component';

async function deleteUser(userId) {
  try {
    // delete from the SQL User Table
    const { data, error } = await supabase
      .from('User')        //table user
      .delete()
      .eq('id', userId);   // filter by id 

    if (error) {
      Store.addNotification({
        title: "Erreur lors de la suppression de l'utilisateur avec ID : " + userId,
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

    // delete from the auth.user table 
    const { data: authData, error: authError } = await supabaseAdmin
      .auth
      .admin
      .deleteUser(userId); // ID dans auth.users

    if (authError) {
      throw new Error("Erreur suppression auth.users : " + authError.message);
    }

    Store.addNotification({
        title: "Utilisateur supprimé",
        message: "ID : " + userId,
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
    return data;

  } catch (err) {
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
    console.error("Erreur inattendue :", err);
    return null;
  }
}

export { deleteUser };