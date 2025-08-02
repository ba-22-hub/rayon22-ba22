import { supabase } from '@lib/supabaseClient.js';

async function deletePDF(fileName){
    console.log("API call, deleting : ", fileName)
    const {data , error} = await supabase.storage
        .from('documents')
        .remove([fileName])

    if (error) {
        console.error('Erreur lors de lal supression :', error.message);
        return null;
    }
    console.log(data)
    return data
    
}
export {deletePDF}