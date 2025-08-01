import { useEffect, useState } from 'react';
import { supabase } from '@lib/supabaseClient';

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
      .eq('replied', false)
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

  const handleReplySend = (id, reply) => {
    console.log(`Réponse au message ${id} :`, reply);
    // TODO : send the reply to the user using Nodemailer
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('Messages').delete().eq('id', id);
    if (error) {
      console.error('Erreur de suppression:', error);
    } else {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    }
  };

  const handleDownloadPDF = (pdfName) => {
    console.log('Ouverture de:', pdfName);
    // Open the PDF in a new tab
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
                <button
                  onClick={() => handleDownloadPDF(msg.pdf_name)}
                  className="mt-2 text-blue-600 underline"
                >
                  {msg.pdf_name}
                </button>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleReplyToggle(msg.id)}
                className="text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
              >
                Répondre
              </button>
              <button
                onClick={() => handleDelete(msg.id)}
                className="text-white bg-red px-3 py-1 rounded hover:bg-red"
              >
                Supprimer
              </button>
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
              <button
                className="mt-2 bg-green text-white px-3 py-1 rounded hover:bg-green"
                onClick={() =>
                  handleReplySend(msg.id, replyStates[msg.id]?.content || '')
                }
              >
                Envoyer
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MessagesDashboard;