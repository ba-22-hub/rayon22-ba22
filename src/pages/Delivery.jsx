// Importing dependencies
import React, { useEffect, useState } from 'react';
import { supabase } from '@lib/supabaseClient.js';
import { useAuthor } from '@context/AuthorContext.jsx'
import { displayNotification } from '@lib/displayNotification.js';

// Importing common components
import Loading from "@common/Loading.jsx"
import FunctionButton from '@common/FunctionButton.jsx';

/**
 * The Delivery page.
 * @returns {React.ReactElement} Delivery component.
 */

function Delivery() {
  const [loading, setLoading] = useState(false);
  const [ongoingDeliveries, setOngoingDeliveries] = useState([]);
  const [pastDeliveries, setPastDeliveries] = useState([]);
  const { user, loading: authorLoading } = useAuthor();
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    if (loading || authorLoading) return; // wait for the author informations to be fetch

    const fetchOngoingDeliveries = async () => {
      console.log(user.id)
      const { data, error } = await supabase
        .from('cart')
        .select('*')
        .eq('client_id', user.id)
        .eq('delivered', false);
      if (error) {
        console.error('Erreur de chargement des livraisons en cours :', error)
        displayNotification("Erreur de chargement des livraisons en cours", error.message, "danger")
      }
      else
        setOngoingDeliveries(data);
      setLoading(false);
    };
    fetchOngoingDeliveries();

    const fetchPastDeliveries = async () => {
      console.log(user.id)
      const { data, error } = await supabase
        .from('cart')
        .select('*')
        .eq('client_id', user.id)
        .eq('delivered', true);
      if (error) {
        console.error('Erreur de chargement des livraisons passées :', error)
        displayNotification("Erreur de chargement des livraisons passées", error.message, "danger")
      }
      else
        setPastDeliveries(data);
      setLoading(false);
    };
    fetchPastDeliveries();
  }, [authorLoading, loading]);

  console.log("livraisons en cours", ongoingDeliveries)

  const toggleExpand = (id) => {
    setExpanded(prev => (prev === id ? null : id));
    setEditMode(null);
  };

  return (
    <>
      <h1 className="text-[#2E2EFF] text-5xl lg:text-7xl font-extrabold leading-tight ml-5 mt-5">Mes livraisons</h1>


      {loading ? <Loading /> : (
        <>
          {/*Ongoing deliveries*/}
          <div key="OngoingDeliveries">
            <div className="flex items-start ...">
              <p className="ml-5 text-[#3435FF] text-3xl lg:text-4xl mb-2 mt-10 font-extrabold text-left">En cours</p>
            </div>

            <div className="overflow-x-auto bg-white shadow rounded">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100 text-left text-sm font-medium text-gray-700">
                  <tr>
                    <th className="px-6 py-3">Date de commande</th>
                    <th className="px-6 py-3">Nombre de produits</th>
                    <th className="px-6 py-3">Date estimée de livraison</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                  {ongoingDeliveries.map(delivery => (
                    <React.Fragment key={delivery.id}>
                      <tr>
                        {/* Date de commande */}
                        <td className="px-6 py-4">
                          {Date(delivery.created_at).toLocaleString("fr")}
                        </td>
                        {/* Nombre de produits */}
                        <td className="px-6 py-4">
                          {delivery.content.length}
                        </td>
                        {/* Date estimée de livraison */}
                        <td className="px-6 py-4">
                          À déterminer
                        </td>

                        {/* Fold / unfold buttons */}
                        <td className="px-6 py-4">
                          <FunctionButton
                            buttonText={expanded === delivery.id ? 'Fermer' : 'Déplier'}
                            fun={() => toggleExpand(delivery.id)}
                            className="text-blue-600 hover:underline mr-4 bg-transparent p-0 shadow-none"
                          />
                        </td>
                      </tr>
                      {expanded === delivery.id && (
                        <></>
                      )}
                    </React.Fragment>
                  ))}
                  {ongoingDeliveries.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray">
                        Aucune livraison en cours.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/*Past deliveries*/}
          <div key="PastDeliveries">
            <div className="flex items-start ...">
              <p className="ml-5 text-[#3435FF] text-3xl lg:text-4xl mb-2 mt-10 font-extrabold text-left">Passées</p>
            </div>

            <div className="overflow-x-auto bg-white shadow rounded">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100 text-left text-sm font-medium text-gray-700">
                  <tr>
                    <th className="px-6 py-3">Date de commande</th>
                    <th className="px-6 py-3">Nombre de produits</th>
                    <th className="px-6 py-3">Date de livraison</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                  {pastDeliveries.map(delivery => (
                    <React.Fragment key={delivery.id}>
                      <tr>
                        {/* Date de commande */}
                        <td className="px-6 py-4">
                          new Date({delivery.created_at})
                        </td>
                        {/* Nombre de produits */}
                        <td className="px-6 py-4">
                          {delivery.content.length}
                        </td>
                        {/* Date estimée de livraison */}
                        <td className="px-6 py-4">
                          À déterminer
                        </td>

                        {/* Fold / unfold buttons */}
                        <td className="px-6 py-4">
                          <FunctionButton
                            buttonText={expanded === delivery.id ? 'Fermer' : 'Déplier'}
                            fun={() => toggleExpand(delivery.id)}
                            className="text-blue-600 hover:underline mr-4 bg-transparent p-0 shadow-none"
                          />
                        </td>
                      </tr>
                      {expanded === delivery.id && (
                        <></>
                      )}
                    </React.Fragment>
                  ))}
                  {pastDeliveries.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray">
                        Aucune livraison passée.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Delivery