import { supabase } from './supabaseClient.js';

async function uploadPDF(file) {
    const fileName = `${Date.now()}_${file.name}`;
    console.log('Uploading file:', fileName, { upsert: false });

    // 1. Uploads the file to Supabase private bucket
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents') // bucket name
        .upload(fileName, file);

    if (uploadError) {
        console.error('Erreur lors de l’upload :', uploadError.message);
        return null;
    }
}

export { uploadPDF };
