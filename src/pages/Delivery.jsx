// Importing dependencies
import React, { useEffect, useState } from 'react';
import { supabase } from '@lib/supabaseClient.js';
import { useAuthor } from '@context/AuthorContext.jsx'
import { displayNotification } from '@lib/displayNotification.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from "leaflet";


// Importing common components
import Loading from "@common/Loading.jsx"
import FunctionButton from '@common/FunctionButton.jsx';
import ProductCarousel from "@common/ProductCarouselDelivery"

/**
 * The Delivery page.
 * @returns {React.ReactElement} Delivery component.
 */

function Delivery() {
  const [loading, setLoading] = useState(false);
  const [ongoingDeliveries, setOngoingDeliveries] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [currentLatitude, setCurrentLatitude] = useState(48.7453);
  const [currentLongitude, setCurrentLongitude] = useState(-3.4700);
  const [currentLatitudeDelivery, setCurrentLatitudeDelivery] = useState(null);
  const [currentLongitudeDelivery, setCurrentLongitudeDelivery] = useState(null);
  const [expandedRelayPoint, setExpandedRelayPoint] = useState(null);

  const { user, loading: authorLoading } = useAuthor();

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
  }, [authorLoading, loading]);

  const toggleExpand = (id) => {
    setCurrentLatitudeDelivery(48.7453);
    setCurrentLongitudeDelivery(-3.4700);
    setExpanded(prev => (prev === id ? null : id));
  };

  const redIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <>
      <h1 className="text-[#2E2EFF] text-5xl lg:text-7xl font-extrabold leading-tight ml-5 mt-5">Livraisons</h1>


      {loading ? <Loading /> : (
        <>
          {/*Ongoing deliveries*/}
          <div key="OngoingDeliveries">
            <div className="flex items-start ...">
              <p className="ml-5 text-[#3435FF] text-3xl lg:text-4xl mb-2 mt-10 font-extrabold text-left">Mes livraisons en cours</p>
            </div>

            <div className="overflow-x-auto bg-white shadow rounded">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100 text-left text-sm font-medium text-gray-700">
                  <tr>
                    <th className="px-6 py-3">Date de commande</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                  {ongoingDeliveries.map(delivery => (
                    <React.Fragment key={delivery.id}>
                      <tr>
                        {/* Command date */}
                        <td className="px-6 py-4">
                          {delivery.created_at}
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
                        <>
                          <tr className="bg-gray-50">
                            <div colSpan="5" className="px-6 py-4">
                              <h2 className="text-rayonblue font-bold text-2xl mb-3">Avancement de la livraison</h2>
                              {(currentLatitudeDelivery && currentLongitudeDelivery) ? (
                                <div className="max-w-screen-lg bg-white rounded-lg p-4">
                                  <div className="w-screen bg-white">
                                    <div id="map" className="h-96 w-full">
                                      <MapContainer
                                        className="h-full w-full"
                                        center={[currentLatitude, currentLongitude]}
                                        zoom={13}
                                        scrollWheelZoom={false}
                                      >
                                        <TileLayer
                                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker
                                          position={[currentLatitudeDelivery, currentLongitudeDelivery]}
                                          eventHandlers={{
                                            click: () => {
                                              setExpandedRelayPoint("");
                                            },
                                          }}
                                        >
                                          <Popup>Votre colis 📦</Popup>
                                        </Marker>

                                        <Marker
                                          position={[currentLatitude, currentLongitude]}
                                          icon={redIcon}
                                          eventHandlers={{
                                            click: () => {
                                              setExpandedRelayPoint("");
                                            },
                                          }}
                                        >
                                          <Popup>Vous êtes ici 📍</Popup>
                                        </Marker>
                                      </MapContainer>
                                    </div>
                                  </div>

                                  {/* Info about a relay point */}
                                  <div className="p-4">
                                    <h2 className="text-rayonblue font-bold text-2xl mb-3">Infos sur la livraison</h2>
                                    <p>Information sur la livraison</p>
                                  </div>
                                </div>
                              ) : (
                                <div>Information indisponible</div>
                              )
                              }
                            </div>

                            <div colSpan="5" className="px-6 py-4">
                              <h2 className="text-rayonblue font-bold text-2xl mb-3">Récapitulatif de la livraison</h2>
                              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                                {[
                                  ['price', 'Prix'],
                                ].map(([field, label]) => (
                                  <div key={field}>
                                    <strong>{label}:</strong>{' '}
                                    {
                                      <span className="ml-1">
                                        {delivery[field] || '—'}
                                      </span>}
                                  </div>
                                ))}

                                {/* Weight */}
                                <div>
                                  <strong>Poids du colis :</strong>{' '}
                                  {
                                    <span className="ml-1">
                                      À déterminer
                                    </span>
                                  }
                                </div>

                                {/* Content */}

                              </div>
                            </div>
                          </tr>
                        </>
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

          {/* Relay points nearby */}
          <div key="RelayPointsNearby">
            <div className="flex items-start">
              <p className="ml-5 text-[#3435FF] text-3xl lg:text-4xl mb-2 mt-10 font-extrabold text-left">Points relais proches de moi</p>
            </div>

            <div className="flex justify-center items-center bg-white">
              <div className="max-w-screen-lg bg-white rounded-lg p-4">
                <div className="w-screen bg-white">
                  <div id="map" className="h-96 w-full">
                    <MapContainer
                      className="h-full w-full"
                      center={[currentLatitude, currentLongitude]}
                      zoom={13}
                      scrollWheelZoom={false}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />

                      <Marker
                        position={[currentLatitude, currentLongitude]}
                        icon={redIcon}
                        eventHandlers={{
                          click: () => {
                            setExpandedRelayPoint("");
                          },
                        }}
                      >
                        <Popup>Vous êtes ici 📍</Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                </div>

                {/* Info about a relay point */}
                <div className="p-4">
                  <h2 className="text-rayonblue font-bold text-2xl mb-3">Infos sur un point de relais</h2>

                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Delivery