// Importing dependencies
import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { supabase } from '@lib/supabaseClient';
import { openPDF } from '@lib/openPDF.js';
import { deletePDF } from '@lib/deletePDF';
import { useAuthor } from '../../context/AuthorContext';
import { useNavigate } from 'react-router-dom';

// Importing common components
import FunctionButton from '@common/FunctionButton.jsx';
import Loading from '@common/Loading.jsx';

function RequestsDashboard() {
    const [requests, setRequests] = useState([]);

    // State to manage loading state to display the Loading component
    const [isLoading, setIsLoading] = useState(true);

    const { isAdmin, loading } = useAuthor()
    const navigate = useNavigate()

    useEffect(() => {
        console.log(loading, isAdmin)
        if (loading) return; // wait for the author informations to be fetch
        if (!isAdmin) {
            navigate('/admin')
            return;
        }
        fetchRequests();
    }, [loading]);

    // Function to fetch requests from the database
    const fetchRequests = async () => {
        const { data, error } = await supabase
            .from('Requests')
            .select(`
        id,
        created_at,
        pdf_name,
        User: user_id (
          id, 
          firstName,
          lastName,
          email
        )
      `)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Erreur de chargement des demandes:', error);
        } else {
            setRequests(data);
        }
        setIsLoading(false);
    };

    // Function to handle deletion of the request
    const handleDelete = async (id) => {
        const fileName = requests.find(req => req.id === id)?.pdf_name;
        console.log(`Suppression de la demande ${id} avec le fichier ${fileName}`);
        deletePDF(fileName);
        const { error } = await supabase
            .from('Requests')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Erreur de suppression:', error);
        } else {
            setRequests((prev) => prev.filter((req) => req.id !== id));
        }
    };

    // Functioon to open the PDF file in a new tab
    const handleDownloadPDF = (pdfName) => {
        console.log('Ouverture de:', pdfName);
        openPDF(pdfName, 10, "requests");
    };

    // Function to handle approval and deletion of the request
    const handleApprove = async (id, user_id) => {
        console.log(`Approbation de la demande ${id} de : ${user_id}`);
        // updated user informations
        try {
            // Date + 1 year
            const endDate = new Date();
            endDate.setFullYear(endDate.getFullYear() + 1);

            // update
            const { data, error } = await supabase
                .from('User')
                .update({
                    has_right: true,
                    end_right: endDate.toISOString() // format compatible PostgreSQL
                })
                .eq('id', user_id)
                .select();

            if (error) {
                console.error("Erreur lors de la mise à jour des droits :", error.message);
            } else {
                handleDelete(id);
            }
        } catch (err) {
            console.error("Erreur inattendue :", err.message);
        }

    }

    // Function to handle decline and deletion of the request
    const handleDecline = async (id) => {
        console.log(`Refus de la demande ${id}`);
        handleDelete(id);
    }

    // Displaying the Loading component
    if (isLoading || loading) {
        return <Loading />;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Demandes d'éligibilité</h2>
            <div className="space-y-4">
                {requests.length === 0 ? (
                    <p className="text-gray-500">Aucune demande disponible.</p>
                ) : (
                    requests.map((req) => (
                        <div key={req.id} className="bg-white border rounded-lg p-4 shadow-md">

                            <p><strong>Date de création :</strong> {new Date(req.created_at).toLocaleString()}</p>

                            <p>
                                <strong>Demandeur :</strong>{' '}
                                {req.User
                                    ? `${req.User.firstName} ${req.User.lastName} (${req.User.email})`
                                    : 'Utilisateur inconnu'}
                            </p>

                            {req.pdf_name && (
                                <FunctionButton
                                    fun={() => handleDownloadPDF(req.pdf_name)}
                                    buttonText={req.pdf_name}
                                    className="mt-2 text-blue-600 underline bg-transparent p-0 shadow-none"
                                />
                            )}

                            <div className="mt-3 flex space-x-2">
                                <button
                                    onClick={() => handleApprove(req.id, req.User.id)}
                                    className="bg-green hover:bg-green text-white px-4 py-2 rounded"
                                >
                                    Accepter
                                </button>
                                <button
                                    onClick={() => handleDecline(req.id)}
                                    className="bg-red hover:bg-red text-white px-4 py-2 rounded"
                                >
                                    Décliner
                                </button>
                            </div>

                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default RequestsDashboard;
