import { supabase } from './supabaseClient.js';

async function uploadPDF(file) {
    const fileName = `${Date.now()}_${file.name}`;
    console.log(file)
    console.log('Uploading file:', fileName);

    // 1. Uploads the file to Supabase private bucket
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents') // bucket name
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: true // overwrite if file already exists
        });

    if (uploadError) {
        console.error('Erreur lors de l’upload :', uploadError.message);
        return null;
    }

    console.log('✅ Upload terminé avec succès :', uploadData);
}

export { uploadPDF };
