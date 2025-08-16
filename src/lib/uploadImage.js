import {Store} from 'react-notifications-component';

import {supabase} from './supabaseClient.js';

async function uploadImage(image, imageName) {
  // Uploads the image to Supabase public bucket
  if (imageName != '') {
    const {data: uploadData, error: uploadError} =
        await supabase.storage.from('images').upload(
            imageName, image, {upsert: true});

    if (uploadError) {
      console.error(
          'Erreur lors de l’upload de l\'image ' + imageName + ' :',
          uploadError.message);
      Store.addNotification({
        title: 'Erreur lors de l\'upload de l\'image ' + imageName,
        message: error.message,
        type: 'danger',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss:
            {duration: 5000, onScreen: true, pauseOnHover: true, showIcon: true}
      });
      return {success: false, error: uploadError};
      ;
    }

    Store.addNotification({
      title: 'Upload de l\'image ' + imageName + ' terminé avec succès',
      type: 'success',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss:
          {duration: 5000, onScreen: true, pauseOnHover: true, showIcon: true}
    });
    return {success: true, data: uploadData};
  } else {
    return;
  }
}

export {uploadImage};
