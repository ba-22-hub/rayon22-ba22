import { supabase } from './supabaseClient.js';
import { displayNotification } from '@lib/displayNotification.js'

async function uploadPDF(file, fileName, folder) {
    console.log('Uploading file:', fileName, { upsert: false });

    const fullPath = `${folder}/${fileName}`;

    // 1. Uploads the file to Supabase private bucket
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents') // bucket name
        .upload(fullPath, file, {
            cacheControl: '3600',
            upsert: true
        });

    if (uploadError) {
        console.error('Erreur lors de l’upload :', uploadError);
        displayNotification("Erreur lors de l'envoi de l'upload du fichier " + fileName, uploadError.message, "danger")
        return { success: false, error: uploadError };;
    }

    displayNotification("Upload terminé avec succès", uploadData, "success")
    return { success: true, data: uploadData };
}

export { uploadPDF };
