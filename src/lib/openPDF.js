import { supabase } from '@lib/supabaseClient.js';
import { displayNotification } from '@lib/displayNotification.js'


// durée de base : 10*60s = 10min 
async function openPDF(fileName ,expiresIn = 10, folder = null) {
    const { data, error } = await supabase.storage
        .from('documents')
        .createSignedUrl(folder ? `${folder}/${fileName}` : fileName, expiresIn * 60)

    if (error) {
        console.error("Une erreur est survenue lors de la génération de l'URL pour le fichier " + fileName + " : ", error)
        displayNotification("Erreur lors de la génération de l'URL pour le fichier " + fileName, error.message, "warning")
    }

    if (data?.signedUrl) {
        // Ouvre le PDF dans un nouvel onglet
        window.open(data.signedUrl, '_blank', 'noopener,noreferrer');
    } else {
        displayNotification("Impossible de générer une URL signée pour le fichier :", fileName, "danger")
    }
}

export { openPDF }