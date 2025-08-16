import { supabase } from './supabaseClient.js';
import { Store } from 'react-notifications-component';

/**
 * Generates a signed URL for a PDF file stored in Supabase storage.
 * @param {string} fileName - The name of the PDF file in the storage bucket
 * @param {number} expiresInSeconds - The duration in seconds for which the signed URL will be valid
 * @returns {Promise<string>} The signed URL for the PDF file or an error if the operation fails
 */
async function getSignedPDFUrl(fileName, expiresInSeconds = 60) {
    // Access the Supabase storage and create a signed URL for the specified file
    const { data, error } = await supabase
        .storage
        .from('documents')
        .createSignedUrl(fileName, expiresInSeconds)

    // Check if there was an error creating the signed URL
    if (error) {
        console.error('Erreur lors de la création de l’URL signée :', error)
        Store.addNotification({
            title: "Erreur lors de la création de l’URL signée",
            message: error.message,
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
        throw error
    }

    Store.addNotification({
        title: "URL signée créée avec succès",
        message: data.signedUrl,
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
    // Return the signed URL
    return data.signedUrl
}

export { getSignedPDFUrl };
