import { supabase } from '@lib/supabaseClient.js';


// durée de base : 10*60s = 10min 
async function openPDF(fileName ,expiresIn = 10, folder = null) {
    console.log("tentative d'ouverture du fichier : ", fileName)

    const { data, error } = await supabase.storage
        .from('documents')
        .createSignedUrl(folder ? `${folder}/${fileName}` : fileName, expiresIn * 60)

    if (error) {
        console.error("Une erreur est survenue lors de la génération de l'URL : ", error)
    }

    if (data?.signedUrl) {
        // Ouvre le PDF dans un nouvel onglet
        window.open(data.signedUrl, '_blank', 'noopener,noreferrer');
    } else {
        console.error("Impossible de générer une URL signée pour ce fichier.");
    }
}

export { openPDF }