import { supabase } from './supabaseClient.js'

/** * Lists PDF files in the Supabase storage bucket.
 * @returns {Promise<void>} Logs the list of files or an error if the operation fails
 */
async function listPDF() {
    const { data, error } = await supabase.storage
        .from('documents')
        .list('', { limit: 100 })

    if (error) {
        console.error('Erreur lors de la lecture du bucket :', error)
        Store.addNotification({
            title: "Erreur lors de la lecture du bucket",
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
    } else {
        console.log('Fichiers dans le bucket :', data)
        Store.addNotification({
            title: "Fichiers dans le bucket :",
            message: data,
            type: "info",
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
    }
}

export { listPDF };
