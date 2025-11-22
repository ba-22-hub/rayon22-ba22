// Importing dependencies
import React, { useEffect, useState } from 'react';
import { supabase } from '@lib/supabaseClient.js';
import { useNavigate } from 'react-router-dom';
import { useAuthor } from '@context/AuthorContext.jsx'
import { displayNotification } from '@lib/displayNotification.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from "leaflet";

// Importing common components
import Loading from "@common/Loading.jsx"
import FunctionButton from '@common/FunctionButton.jsx';

// Importing assets
import redMarker from "@assets/Assets/marker-icon-2x-red.png"
import orangeMarker from "@assets/Assets/marker-icon-2x-orange.png"

/**
 * The Delivery page.
 * @returns {React.ReactElement} Delivery component.
 */

function Delivery() {
    const [loading, setLoading] = useState(false);
    const [ongoingDeliveries, setOngoingDeliveries] = useState([]);
    const [expanded, setExpanded] = useState(null);
    const [currentLatitude, setCurrentLatitude] = useState(null);
    const [currentLongitude, setCurrentLongitude] = useState(null);
    const [currentLatitudeDelivery, setCurrentLatitudeDelivery] = useState(null);
    const [currentLongitudeDelivery, setCurrentLongitudeDelivery] = useState(null);
    const [expandedRelayPoint, setExpandedRelayPoint] = useState(null);
    const [enableGeolocalisation, setEnableGeolocalisation] = useState(false);

    const [mapReload, setMapReload] = useState(0);

    // --- States pour points relais ---
    const [chosenPostalCode, setChosenPostalCode] = useState("");
    const [chosenCoords, setChosenCoords] = useState({});
    const [pickupPoints, setPickupPoints] = useState([]);
    const [loadingPickup, setLoadingPickup] = useState(false);
    const [errorPickup, setErrorPickup] = useState(null);

    const { user } = useAuthor();
    const navigate = useNavigate()

    const redIcon = L.icon({
        iconUrl: redMarker,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    const orangeIcon = L.icon({
        iconUrl: orangeMarker,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    // only accessible to users (this page needs user info)
    useEffect(() => {
        if (loading) return;
        if (!user) {
            displayNotification("Vous devez vous connecter pour utiliser cette fonctionnalité !", "Connexion requise", "warning")
            navigate('/login')
            return;
        }
    }, [loading])

    // re-render the map componant
    useEffect(() => {
        if (chosenCoords.latitude && chosenCoords.longitude) {
            setMapReload(prev => prev + 1);
        } else if (enableGeolocalisation && currentLatitude && currentLongitude) {
            // Forcer le reload quand on utilise la géolocalisation
            setMapReload(prev => prev + 1);
        }
    }, [chosenCoords, enableGeolocalisation, currentLatitude, currentLongitude]);

    useEffect(() => {
        if (loading) return;
        // Récupérer la position de l'utilisateur UNE SEULE FOIS au chargement
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords
                        setCurrentLatitude(latitude)
                        setCurrentLongitude(longitude)
                    },
                    (error) => {
                        displayNotification("Impossible d'accéder à votre localisation", error.message, "warning")
                    }
                )
            } else {
                displayNotification("Impossible d'accéder à votre localisation", "La fonctionnalité de géolocalisation n'est pas supportée par votre navigateur", "warning")
            }
        }

        const fetchOngoingDeliveries = async () => {
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
        getLocation();
    }, [loading]);

    // --- Fonction pour récupérer les points relais ---
    const fetchPickupPoints = async (postalCode) => {
        setLoadingPickup(true);
        setErrorPickup(null);
        try {
            // Récupérer les coordonnées du code postal
            const coords = await geocode(postalCode);
            if (coords) {
                setChosenCoords(coords);
                console.log(coords)
            }

            const { data, error } = await supabase.functions.invoke('dpd_pickup_points', {
                body: JSON.stringify({
                    postalCode: postalCode,
                    countryCode: 'FR'
                })
            })
            if (error) {
                throw new Error(error)
            } else {
                console.log(data)
                setPickupPoints(data.points);
            }
        } catch (e) {
            setErrorPickup(e.message);
            displayNotification("Erreur lors de la récupération des points de relais proches", e.message, "danger")
        } finally {
            setLoadingPickup(false);
        }
    };

    async function reverseGeocode(lat, lon) {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`;

        const response = await fetch(url, {
            headers: { "User-Agent": "Rayon22" }
        });

        const data = await response.json();
        return data.address.postcode || null;
    }

    async function geocode(postcode, country = "fr") {
        const url = `https://nominatim.openstreetmap.org/search?postalcode=${postcode}&country=${country}&format=json&limit=1`;

        const response = await fetch(url, {
            headers: { "User-Agent": "Rayon22" }
        });

        const data = await response.json();

        if (!data || data.length === 0) return null;

        return {
            latitude: parseFloat(data[0].lat),
            longitude: parseFloat(data[0].lon)
        };
    }

    const toggleExpand = (id) => {
        setCurrentLatitudeDelivery(48.7453);
        setCurrentLongitudeDelivery(-3.4700);
        setExpanded(prev => (prev === id ? null : id));
    };

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };

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
                                                    {new Date(delivery.created_at).toLocaleString('fr-FR', options)}

                                                    {/* Fold / unfold buttons */}
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
                                                        <h2 className="text-rayonblue font-bold text-2xl mb-3 px-4 mt-4">Avancement de la livraison</h2>
                                                        {(currentLatitudeDelivery && currentLongitudeDelivery) ? (
                                                            <div className="bg-white rounded-lg p-4">
                                                                <div className="w-full bg-white">
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

                                                        <div colSpan="5" className="px-6 py-4">
                                                            <h2 className="text-rayonblue font-bold text-2xl mb-3">Récapitulatif de la livraison</h2>
                                                            <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                                                                {/* Command date */}
                                                                <div>
                                                                    <strong>Date de la commande :</strong>{' '}
                                                                    {
                                                                        <span className="ml-1">
                                                                            {new Date(delivery.created_at).toLocaleString('fr-FR', options)}
                                                                        </span>
                                                                    }
                                                                </div>

                                                                {/* Price */}
                                                                <div>
                                                                    <strong>Prix :</strong>{' '}
                                                                    {
                                                                        <span className="ml-1">
                                                                            {delivery["price"]} €
                                                                        </span>
                                                                    }
                                                                </div>

                                                                {/* Number of products */}
                                                                <div>
                                                                    <strong>Nombre total d'articles :</strong>{' '}
                                                                    {
                                                                        <span className="ml-1">
                                                                            {delivery.content.reduce((sum, product) => sum + product.quantity, 0)}
                                                                        </span>
                                                                    }
                                                                </div>

                                                                {/* Content */}
                                                                <div>
                                                                    <strong>Contenu du colis :</strong>{' '}
                                                                    <table className="min-w-full divide-y divide-gray-200">
                                                                        <thead className="bg-gray-100 text-left text-sm font-medium text-gray-700">
                                                                            <tr>
                                                                                <th className="px-6 py-3">Produit</th>
                                                                                <th className="px-6 py-3">Quantité</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                                            {delivery.content.map((product) => (
                                                                                <tr key={product.id}>
                                                                                    <td className="px-6 py-4">{product.name}</td>
                                                                                    <td className="px-6 py-4">{product.quantity}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
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


                        <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
                            <h2>Dans quelle ville souhaitez-vous récupérer cotre colis ?</h2>
                            <input
                                type="text"
                                placeholder="Code postal"
                                value={chosenPostalCode}
                                onChange={(e) => setChosenPostalCode(e.target.value)}
                            />
                            <FunctionButton
                                buttonText={loadingPickup ? "Chargement..." : "Rechercher"}
                                fun={async () => { fetchPickupPoints(chosenPostalCode), setEnableGeolocalisation(false) }}
                                disabled={loadingPickup}
                                className="bg-rayonorange mt-3 w-80 h-10"
                            />
                            <FunctionButton
                                buttonText={loadingPickup ? "Chargement..." : "Me localiser"}
                                fun={async () => {
                                    if (!currentLatitude || !currentLongitude) {
                                        displayNotification("Géolocalisation non disponible", "Veuillez autoriser l'accès à votre position", "warning");
                                        return;
                                    }
                                    setChosenCoords({});
                                    setEnableGeolocalisation(true); // Active le flag
                                    const code = await reverseGeocode(currentLatitude, currentLongitude);
                                    if (code) {
                                        await fetchPickupPoints(code);
                                    }
                                }}
                                className="bg-rayonorange mt-3 w-80 h-10"
                            />
                            {errorPickup && <p style={{ color: "red" }}>{errorPickup}</p>}
                            {pickupPoints.length > 0 && (
                                <ul>
                                    {pickupPoints.map((p, i) => (
                                        <li key={i}>
                                            <strong>{p.name}</strong> - {p.address}, {p.postalCode} {p.city}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <hr style={{ margin: "2rem 0" }} />
                        </div>

                        {(currentLatitude !== null && currentLongitude !== null) ? (
                            <div className="flex items-center bg-white">
                                <div className="max-w-screen-lg bg-white rounded-lg p-0">
                                    <div className="w-screen bg-white">
                                        <div id="map" className="h-96 w-full">
                                            <MapContainer
                                                className="h-full w-full"
                                                center={chosenCoords.latitude && chosenCoords.longitude
                                                    ? [chosenCoords.latitude, chosenCoords.longitude]
                                                    : [currentLatitude, currentLongitude]
                                                }
                                                zoom={13}
                                                scrollWheelZoom={false}
                                                key={mapReload}
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
                                                {pickupPoints.length > 0 &&
                                                    pickupPoints.map((pickupPoint, index) => (
                                                        <Marker
                                                            key={pickupPoint.id || index}
                                                            position={[
                                                                parseFloat(pickupPoint.latitude.replace(",", ".")),
                                                                parseFloat(pickupPoint.longitude.replace(",", ".")),
                                                            ]}
                                                            icon={orangeIcon}
                                                            eventHandlers={{
                                                                click: () => {
                                                                    setExpandedRelayPoint(pickupPoint.id);
                                                                },
                                                            }}
                                                        >
                                                            <Popup>
                                                                <strong>{pickupPoint.name}</strong> 📬<br />
                                                                {pickupPoint.address}<br />
                                                                {pickupPoint.postalCode} {pickupPoint.city}
                                                            </Popup>
                                                        </Marker>
                                                    ))
                                                }
                                            </MapContainer>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>Localisation indisponible</>
                        )}
                    </div>
                </>
            )}
        </>
    )
}

export default Delivery