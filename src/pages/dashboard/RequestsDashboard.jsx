// Importing dependencies
import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { supabase } from '@lib/supabaseClient';
import { openPDF } from '@lib/openPDF.js';
import { deletePDF } from '@lib/deletePDF';

// Importing common components
import FunctionButton from '@common/FunctionButton.jsx';

function RequestsDashboard() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchRequests();
    }, []);

    // Function to fetch requests from the database
    const fetchRequests = async () => {
        const { data, error } = await supabase
            .from('Requests')
            .select(`
        id,
        created_at,
        pdf_name,
        User: user_id (
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
        openPDF(pdfName, 10);
    };

    // Function to handle approval and deletion of the request
    const handleApprove = async (id) => {
        console.log(`Approbation de la demande ${id}`);
        handleDelete(id);
    }

    // Function to handle decline and deletion of the request
    const handleDecline = async (id) => {
        console.log(`Refus de la demande ${id}`);
        handleDelete(id);
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Demandes PDF</h2>
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
                                    onClick={() => handleApprove(req.id)}
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
