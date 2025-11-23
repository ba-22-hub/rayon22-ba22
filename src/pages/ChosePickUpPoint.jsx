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

function ChosePickUpPoint() {
    const [loading, setLoading] = useState(true); // Changé à true pour démarrer en loading
    const [ongoingDeliveries, setOngoingDeliveries] = useState([]);
    const [currentLatitude, setCurrentLatitude] = useState(null);
    const [currentLongitude, setCurrentLongitude] = useState(null);

    const [currPoint, setCurrPoint] = useState({id : 0})

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
        if (!user && !loading) {
            displayNotification("Vous devez vous connecter pour utiliser cette fonctionnalité !", "Connexion requise", "warning")
            navigate('/login')
            return;
        }
    }, [user, loading, navigate])

    useEffect(() => {
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
            if (!user) return;
            
            const { data, error } = await supabase
                .from('cart')
                .select('*')
                .eq('client_id', user.id)
                .eq('delivered', false);
            if (error) {
                console.error('Erreur de chargement des livraisons en cours :', error)
                displayNotification("Erreur de chargement des livraisons en cours", error.message, "danger")
            } else {
                setOngoingDeliveries(data);
            }
            setLoading(false);
        };

        fetchOngoingDeliveries();
        getLocation();
    }, [user]);

    function selectPoint( point ){
        console.log("Point selectionné : ", point )
        setCurrPoint(point)
    } 

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

    // Déterminer le centre de la carte
    const getMapCenter = () => {
        if (chosenCoords.latitude && chosenCoords.longitude) {
            return [chosenCoords.latitude, chosenCoords.longitude];
        }
        if (currentLatitude && currentLongitude) {
            return [currentLatitude, currentLongitude];
        }
        // Position par défaut (France)
        return [46.603354, 1.888334];
    };

    return (
        <>
            <h1 className="text-[#2E2EFF] text-5xl lg:text-7xl font-extrabold leading-tight ml-5 mt-5">
                Choix du point de livraison
            </h1>

            {loading ? <Loading /> : (
                <>
                    {/* Relay points nearby */}
                    <div key="RelayPointsNearby" className='flex lg:flex-row flex-col'>
                        <div style={{ padding: "2rem", fontFamily: "sans-serif" }} className="lg:w-1/2">
                            <div className="flex items-start">
                                <p className="ml-5 text-[#3435FF] text-3xl lg:text-4xl mb-2 mt-10 font-extrabold text-left">
                                    Points relais proches de moi
                                </p>
                            </div>
                            <h2 className="mb-4">Dans quelle ville souhaitez-vous récupérer votre colis ?</h2>
                            
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Code postal"
                                    value={chosenPostalCode}
                                    onChange={(e) => setChosenPostalCode(e.target.value)}
                                    className="border rounded p-2 w-full max-w-xs"
                                />
                            </div>

                            <FunctionButton
                                buttonText={loadingPickup ? "Chargement..." : "Rechercher"}
                                fun={async () => {
                                    if (chosenPostalCode.trim()) {
                                        await fetchPickupPoints(chosenPostalCode);
                                    }
                                }}
                                disabled={loadingPickup || !chosenPostalCode.trim()}
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
                                    const code = await reverseGeocode(currentLatitude, currentLongitude);
                                    if (code) {
                                        await fetchPickupPoints(code);
                                    }
                                }}
                                className="bg-rayonorange mt-3 w-80 h-10"
                            />

                            {errorPickup && <p style={{ color: "red" }} className="mt-4">{errorPickup}</p>}
                            
                            {pickupPoints.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="font-bold mb-3">Points relais disponibles :</h3>
                                    <ul className="space-y-2">
                                        {pickupPoints.map((p, i) => (
                                            <li key={p.id} className={p.id == currPoint.id ? "border p-1 rounded hover:bg-gray-50 bg-[#8FF29F] hover:bg-[#00C921]" : "border p-1 rounded hover:bg-gray-50 hover:bg-[#cccccc]"} onClick={() => selectPoint(p) } >
                                                <strong>{p.name}</strong> - {p.address1.toLowerCase()}, {p.zipCode} {p.city}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="lg:w-1/2 flex items-start justify-center p-4 -mt-10">
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-2xl">
                                <div id="map" className="h-[80vh] w-full">
                                    <MapContainer
                                        className="h-full w-full"
                                        center={getMapCenter()}
                                        zoom={13}
                                        scrollWheelZoom={true}
                                        key={`${chosenCoords.latitude}-${chosenCoords.longitude}-${pickupPoints.length}`}
                                    >
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />

                                        {currentLatitude && currentLongitude && (
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
                                        )}

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
                </>
            )}
        </>
    )
}

export default ChosePickUpPoint