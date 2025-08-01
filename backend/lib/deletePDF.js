import { supabase } from '@lib/supabaseClient.js';

async function deletePDF(fileName){
    console.log("API call, deleting : ", fileName)
    const {data , error} = await supabase.storage
        .from('documents')
        .remove(fileName)

    if (uploadError) {
        console.error('Erreur lors de lal supression :', uploadError.message);
        return null;
    }
    
}
export {deletePDF}