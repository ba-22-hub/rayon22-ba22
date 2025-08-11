import { supabase } from './supabaseClient.js';

async function uploadImage(image, imageName) {
    console.log('Uploading image:', imageName, { upsert: false });

    // Uploads the image to Supabase public bucket
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('images')
        .upload(imageName, image, {
            upsert: true
        });

    if (uploadError) {
        console.error('Erreur lors de l’upload :', uploadError.message);
        return { success: false, error: uploadError };;
    }

    console.log('✅ Upload terminé avec succès :', uploadData);
    return { success: true, data: uploadData };
}

export { uploadImage };
