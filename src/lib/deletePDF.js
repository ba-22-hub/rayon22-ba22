import {displayNotification} from '@lib/displayNotification.js'
import {supabase} from '@lib/supabaseClient.js';

async function deletePDF(fileName) {
  const {data, error} =
      await supabase.storage.from('documents').remove([fileName])

  if (error) {
    console.error('Erreur lors de la supression :', error);
    displayNotification('Erreur lors de la suppression de ' + fileName, error.message, 'danger')
    return null;
  }
  displayNotification(fileName + ' supprimé', data, 'success')
  return data
}
export {deletePDF}