import { supabase } from './supabaseClient.js';

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
        Store.addNotification({
            title: "Erreur lors de l'envoi de l'upload du fichier " + fileName,
            message: uploadError.message,
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
        return { success: false, error: uploadError };;
    }

    Store.addNotification({
        title: "Upload terminé avec succès",
        message: uploadData,
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
    return { success: true, data: uploadData };
}

export { uploadPDF };
