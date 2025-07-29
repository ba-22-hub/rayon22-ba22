import { supabase } from '@lib/supabaseClient.js';

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

    // 2. Generates a signed URL to access the uploaded file
    // const { data: signedURLData, error: signedURLError } = await supabase.storage
    //     .from('documents')
    //     .createSignedUrl(fileName, 60 * 60); // URL valid for 1 hour

    // if (signedURLError) {
    //     console.error('Erreur lors de la création de l’URL signée :', signedURLError.message);
    //     return null;
    // }

    // console.log('Fichier uploadé. URL signée :', signedURLData.signedUrl);
    // return signedURLData.signedUrl;
}

export { uploadPDF };
