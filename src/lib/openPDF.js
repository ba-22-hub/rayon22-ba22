import { supabase } from '@lib/supabaseClient.js';
import { Store } from 'react-notifications-component';


// durée de base : 10*60s = 10min 
async function openPDF(fileName ,expiresIn = 10, folder = null) {
    const { data, error } = await supabase.storage
        .from('documents')
        .createSignedUrl(folder ? `${folder}/${fileName}` : fileName, expiresIn * 60)

    if (error) {
        console.error("Une erreur est survenue lors de la génération de l'URL pour le fichier " + fileName + " : ", error)
        Store.addNotification({
            title: "Erreur lors de la génération de l'URL pour le fichier " + fileName,
            message: error.message,
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
    }

    if (data?.signedUrl) {
        // Ouvre le PDF dans un nouvel onglet
        window.open(data.signedUrl, '_blank', 'noopener,noreferrer');
    } else {
        Store.addNotification({
            title: "Impossible de générer une URL signée pour le fichier :",
            message: fileName,
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
    }
}

export { openPDF }