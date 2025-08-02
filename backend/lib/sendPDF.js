import { supabase } from './supabaseClient.js';

async function uploadPDF(file, fileName) {
    console.log('Uploading file:', fileName, { upsert: false });

    // 1. Uploads the file to Supabase private bucket
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents') // bucket name
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: true
        });

    if (uploadError) {
        console.error('Erreur lors de l’upload :', uploadError.message);
        return { success: false, error: uploadError };;
    }

    console.log('✅ Upload terminé avec succès :', uploadData);
    return { success: true, data: uploadData };
}

export { uploadPDF };
