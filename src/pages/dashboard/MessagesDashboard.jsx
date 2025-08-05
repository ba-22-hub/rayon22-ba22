// Importing dependencies
import { useEffect, useState } from 'react';
import { sendReply } from '@lib/sendReply.js';
import { supabase } from '@lib/supabaseClient';
import { openPDF } from '@lib/openPDF.js';
import { deletePDF } from '@lib/deletePDF';

// Importing common components
import FunctionButton from '@common/FunctionButton.jsx';

function MessagesDashboard() {
  const [messages, setMessages] = useState([]);
  const [replyStates, setReplyStates] = useState({});

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('Messages')
      .select(`
      id,
      message,
      pdf_name,
      created_at,
      user_id,
      User: user_id (
        firstName,
        lastName,
        email
      )
    `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur de chargement des messages:', error);
    } else {
      setMessages(data);
    }
  };

  const handleReplyToggle = (id) => {
    setReplyStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleReplySend = async (id, reply) => {
    console.log(`Réponse au message ${id} :`, reply);
    const email = messages.find(msg => msg.id === id)?.User.email;
    const firstName = messages.find(msg => msg.id === id)?.User.firstName;
    const lastName = messages.find(msg => msg.id === id)?.User.lastName;
    console.log('Email de l’utilisateur:', email);

  if (!email) return console.error("Aucun email trouvé.");

  try {
    const result = sendReply({
      email: email,
      name: `${firstName} ${lastName}`,
      reply: reply,
    });

    console.log('Email envoyé !', result.text);
  } catch (error) {
    console.error('Erreur d’envoi :', error);
  }
  handleDelete(id); // Delete the message after sending the reply
  };

  const handleDelete = async (id) => {
    const fileName = messages.find(msg => msg.id === id)?.pdf_name;
    console.log('Suppression du message avec ID:', id, 'et fichier:', fileName);
    deletePDF(fileName)
    const { data, error } = await supabase
      .from('Messages')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Erreur de suppression:', error);
    } else {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    }
  };

  const handleDownloadPDF = (pdfName) => {
    console.log('Ouverture de:', pdfName);
    // Open the PDF in a new tab
    openPDF(pdfName, 10, "messages");
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Messages des utilisateurs</h2>

      {messages.map((msg) => (
        <div key={msg.id} className="border rounded-lg p-4 shadow bg-white space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">
                Reçu le {new Date(msg.created_at).toLocaleString()} par <strong>{msg.User.firstName} {(msg.User.lastName).toUpperCase()}</strong>
              </p>
              <p className="mt-2">{msg.message}</p>
              {msg.pdf_name && (
                <FunctionButton
                  fun={() => handleDownloadPDF(msg.pdf_name)}
                  buttonText={msg.pdf_name}
                  className="mt-2 text-blue-600 underline bg-transparent p-0 shadow-none"
                />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <FunctionButton
                fun={() => handleReplyToggle(msg.id)}
                buttonText="Répondre"
                className="text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
              />
              <FunctionButton
                fun={() => handleDelete(msg.id)}
                buttonText="Supprimer"
                className="text-white bg-red px-3 py-1 rounded hover:bg-red"
              />
            </div>
          </div>

          {replyStates[msg.id] && (
            <div className="mt-4">
              <textarea
                className="w-full p-2 border rounded"
                rows="4"
                placeholder="Écris ta réponse ici..."
                onChange={(e) =>
                  setReplyStates((prev) => ({
                    ...prev,
                    [msg.id]: {
                      ...prev[msg.id],
                      content: e.target.value,
                    },
                  }))
                }
              ></textarea>
              <FunctionButton
                fun={() => handleReplySend(msg.id, replyStates[msg.id]?.content || '')}
                buttonText="Envoyer"
                className="mt-2 bg-green text-white px-3 py-1 rounded hover:bg-green"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MessagesDashboard;