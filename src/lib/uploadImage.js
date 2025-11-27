import { displayNotification } from '@lib/displayNotification.jsx'
import { supabase } from './supabaseClient.js';

async function uploadImage(image, imageName) {
  // Uploads the image to Supabase public bucket
  if (imageName) {
    console.log(imageName);
    const { data: uploadData, error: uploadError } =
      await supabase.storage.from('images').upload(
        imageName, image, { upsert: true });

    if (uploadError) {
      console.error(
        'Erreur lors de l’upload de l\'image ' + imageName + ' :',
        uploadError.message);
      displayNotification('Erreur lors de l\'upload de l\'image ' + imageName, error.message, 'danger')
      return { success: false, error: uploadError };
      ;
    }

    displayNotification('Upload de l\'image ' + imageName + ' terminé avec succès', "", 'success')
    return { success: true, data: uploadData };
  } else {
    return;
  }
}

export { uploadImage };
