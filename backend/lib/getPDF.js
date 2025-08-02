import { supabase } from './supabaseClient.js';

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
        console.error('Erreur lors de la création de l’URL signée :', error.message)
        throw error
    }

    console.log('URL signée créée avec succès :', data.signedUrl)
    // Return the signed URL
    return data.signedUrl
}

export { getSignedPDFUrl };
