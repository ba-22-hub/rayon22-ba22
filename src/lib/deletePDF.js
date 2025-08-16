import { supabase } from '@lib/supabaseClient.js';
import { Store } from 'react-notifications-component';

async function deletePDF(fileName){
    const {data , error} = await supabase.storage
        .from('documents')
        .remove([fileName])

    if (error) {
        console.error('Erreur lors de la supression :', error);
        Store.addNotification({
            title: "Erreur lors de la suppression de " + fileName,
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
    Store.addNotification({
        title: fileName + " supprimé",
        message: data,
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
    return data
    
}
export {deletePDF}