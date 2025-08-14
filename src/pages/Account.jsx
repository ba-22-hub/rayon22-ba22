import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { supabase } from '@lib/supabaseClient.js';
import { useAuthor } from "../context/AuthorContext.jsx";
import { uploadPDF } from '@lib/sendPDF.js'

import Loading from "../common/Loading.jsx";



function Account() {

    const [editing, setEditing] = useState(false)
    const [clientEdit, setClientEdit] = useState(null)
    const [client, setClient] = useState(null)
    const [file, setFile] = useState(null)
    const [activeRequests, setActiveRequest] = useState(false)
    const { user, logout, isAdmin, loading, checkIsAdmin } = useAuthor()

    const fileInputRef = useRef(null);


    // options for the radio buttons when the edit mod is enable
    const genderOptions = ["Homme", "Femme", "Autre"]
    const situationOptions = ["Employé", "Sans emploi", "Étudiant", "Retraité"]
    const wageOptions = ["Salaire", "Bourse", "Aide", "Autre"]

    let navigate = useNavigate()

    useEffect(() => {
        if (!user) return; // to avoid error in the console
        const fetchUserData = async () => {
            try {
                // retrieving user's data
                const uid = user.id
                const { data: userdata, error: dberror } = await supabase
                    .from('User')
                    .select('*')
                    .eq('id', uid)
                    .single();

                if (dberror && dberror.code !== 'PGRST116') {
                    // other error
                    console.error("Erreur lors de la vérification du user:", dberror.message);
                    return;
                }

                setClientEdit(userdata);
                setClient(userdata);
            } catch (error) {
                console.error("Erreur inattendue:", error.message);
            }
        }
        const checkRequest = async () => {
            try {
                console.log("Checking requests ...")
                const { data, error: dberror } = await supabase
                    .from('Requests')
                    .select('id') // optimisation
                    .eq('user_id', user.id)
                    .limit(1); // no need to reseach several requests

                if (dberror && dberror.code !== 'PGRST116') {
                    console.error("Erreur lors de la vérification des requêtes :", dberror.message);
                    return;
                }
                console.log("request found : ", data)
                setActiveRequest(data.length > 0)
            } catch (error) {
                console.error("Erreur inattendue:", error.message);
            }
        }
        console.log(loading, isAdmin)
        checkIsAdmin(user.id) // needed otherwise the update of 'isAdmin' isn't fast enough
            .then(fetchUserData())
            .then(() => checkRequest())
    }, [loading])



    function handleChange(e) {
        const { name, value } = e.target;
        if (name == "wageType" && value == "Autre") {
            const other = window.prompt("Quel est votre type de salaire ?");
            if (other) {
                setClientEdit(prev => ({
                    ...prev,
                    [name]: value,
                    otherWage: other
                }));

            }
        } else {
            setClientEdit(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    function handleCancel() {
        setClientEdit(client)
        setEditing(false)
        console.log("editmod disable")
    }

    // handle the edit of the personnal informations
    async function handleEdit(e) {
        e.preventDefault(); // Empêche le rechargement de la page
        console.log("sending ", clientEdit, "to API...")

        try {
            const { data, error } = await supabase
                .from('User') // Table User
                .update(clientEdit) // update with the 
                .eq('id', clientEdit.id) // Filtre par l'ID du client
                .select(); // Optionnel : pour récupérer les données mises à jour

            if (error) {
                throw error;
            }

            console.log("Data changed : ", data)
            setEditing(false)
            alert("Les informations ont été modifiées avec succès")
        } catch (err) {
            alert("Erreur lors de l'ajout dans la base de donnée")
            console.error("Error uptdating client... ", err.message)
        }
    }

    function handleFileSelection(e) {
        console.log("Un fichier a été déposé")
        const incomingFile = e.target.files[0]
        console.log(incomingFile)
        setFile(incomingFile)
        console.log(incomingFile.name)
    }

    async function handleFileSubmit() {
        // 1) upload the file 
        let uploadSuccess = true
        const name = `${Date.now()}_${file.name}`
        const { success, error } = await uploadPDF(file, name, "requests")
        if (!success) {
            console.error("❌ Upload échoué :", error);
            alert("Erreur lors de l'upload du fichier PDF.");
            uploadSuccess = false;
        }

        // 2) if the file has been uploaded, add the request in the db 
        if (!uploadSuccess) return;

        const newRequest = {
            user_id: user.id,
            pdf_name: name,
        };

        const { error: insertError } = await supabase
            .from('Requests')
            .insert([newRequest]);

        if (insertError) {
            console.error("❌ Erreur lors de l'insertion :", insertError.message);
            alert("Erreur lors de l'envoi de la requête.");
            return;
        }

        console.log("✅ Requetes inséré avec succès !", newRequest);

        // manually emptying the file field
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setFile(null)
        setActiveRequest(false)
        alert("La requête à bien été prise en compte ! ")

    }

    function handleDeconnection() {
        logout()
        console.log("Deconnexion...")
        navigate('/login')
    }

    // on factorise l'élément le plus volumineux 
    const renderField = (label, fieldName) => (
        <div className="flex flex-row items-center text-rayonblue mb-2">
            <label className="font-semibold min-w-[180px] whitespace-nowrap mr-4">{label} :</label>
            <div className="flex-1">
                {editing ? (
                    <input
                        className="border border-rayonorange rounded-lg w-full text-rayonorange pl-2 h-[1.8rem]"
                        name={fieldName}
                        value={clientEdit[fieldName]}
                        onChange={handleChange}
                    />
                ) : (
                    <p className="text-rayonblue">{clientEdit[fieldName]}</p>
                )}
            </div>
        </div>
    );


    const renderRadio = (label, fieldName, options) => (
        <div className="flex flex-row items-center text-rayonblue mb-2">
            <label className="font-semibold min-w-[180px] whitespace-nowrap mr-4">{label} :</label>
            <div className="flex-1">
                {editing ? (
                    <div className="flex flex-wrap gap-4 text-rayonorange">
                        {options.map((option) => (
                            <label key={option} className="flex items-center">
                                <input
                                    className="mr-1"
                                    type="radio"
                                    name={fieldName}
                                    value={option}
                                    checked={clientEdit[fieldName] === option}
                                    onChange={handleChange}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                ) : (
                    <p className="text-rayonblue">{clientEdit[fieldName]}</p>
                )}
            </div>
        </div>
    );



    return (
        <>
            {!clientEdit || loading ? (
                <Loading />
            ) : (
                isAdmin ? (
                    <>
                        <div className="w-[66vw] mx-auto p-[4vw] bg-white rounded-2xl shadow-sm mb-[4vw] flex flex-col items-center text-center">
                            <p className="text-rayonblue text-[4em]">Ce compte est administrateur</p>
                            <br />
                            <p>Il ne possède donc par conséquent pas de données personnelles</p>

                            <button
                                className="text-white bg-rayonorange w-[30vw] mb-3 mt-[10vh] h-[2rem]"
                                onClick={() => navigate('/admin/users')}
                            >
                                Accéder à l'application administrateur
                            </button>

                            <button
                                className="text-white bg-red w-[30vw] mb-3 mt-[2vh] h-[2rem]"
                                onClick={handleDeconnection}
                            >
                                Se déconnecter
                            </button>
                        </div>

                    </>
                ) : (
                    <div className="w-[66vw] ml-[17vw] p-[8vw] bg-white rounded-2xl shadow-sm mb-[4vw]">
                        <h1 className="text-center text-rayonblue text-[4.3em] leading-tight font-bold">Bienvenue sur votre Espace Utilisateur</h1>
                        <button
                            onClick={handleDeconnection}
                            className="text-white bg-red rounded-lg w-[10vw] ml-[40vw]"
                        >⏼ Déconnexion</button>
                        <div className="flex flex-row">
                            <div className="border border-rayonblue rounded-lg mt-[1.5em] w-[24vw] p-2">
                                <h2 className="text-rayonblue text-[1.5em] font-semibold">État civil</h2>
                                {renderField("Nom", "lastName")}
                                {renderField("Prénom", "firstName")}
                                {renderRadio("Genre", "gender", genderOptions)}

                            </div>
                            <div className="border border-rayonblue rounded-lg mt-[1.5em] w-[26vw] ml-[2vw] p-2">
                                <h2 className="text-rayonblue text-[1.5em] font-semibold">Contact</h2>
                                {renderField("E-mail", "email")}
                                {renderField("Téléphone", "phone")}
                                {renderField("Adresse", "address")}
                                {renderField("Précisions", "addAddress")}
                                {renderField("Ville", "city")}
                                {renderField("Code postal", "postalCode")}
                            </div>
                        </div>
                        <div className="border border-rayonblue rounded-lg mt-[1.5em] w-[50vw] p-2">
                            <h2 className="text-rayonblue text-[1.5em] font-semibold">Déclarations</h2>
                            {renderRadio("Situation", "situation", situationOptions)}
                            {renderField("Quotient familial (CAF)", "quotient")}
                            {renderRadio("Type de salaire", "wageType", wageOptions)}
                        </div>

                        {/* rights */}
                        <div className="border border-rayonblue rounded-lg mt-[1.5em] w-[50vw] p-2">
                            <h2 className="text-rayonblue text-[1.5em] font-semibold">Vos droits</h2>

                            <div className="grid grid-cols-[300px_120px] gap-x-3 text-rayonblue">
                                <label className="font-semibold">Date de validité du compte :</label>
                                <p className="text-right">
                                    {client.has_right ? client.end_right : "Compte invalide"}
                                </p>
                                

                                <label className="font-semibold">Poids maximum mensuel :</label>
                                <p className="text-right">{client.weight_limit === null ? "Pas de limite" : `${(client.weight_limit.toFixed(2)/1000)} kg`}</p>

                                <label className="font-semibold">{client.weight_limit === null ? "Poids déjà acheté ce mois-ci :" : "Poids restant ce mois-ci :"}</label>
                                <p className="text-right">{client.weight_limit === null ? `${(client.current_weight.toFixed(2)/1000)} kg` : `${((client.weight_limit - client.current_weight).toFixed(2)/1000)} kg`}</p>

                                <label className="font-semibold">Budget maximum mensuel :</label>
                                <p className="text-right">{client.price_limit === null ? "Pas de limite" : `${client.price_limit.toFixed(2)} €`}</p>

                                <label className="font-semibold">{client.price_limit === null ? "Budget déjà dépensé ce mois-ci :" : "Budget restant ce mois-ci :"}</label>
                                <p className="text-right">{client.price_limit === null ? `${client.current_price.toFixed(2)} €` : `${(client.price_limit - client.current_price).toFixed(2)} €`}</p>

                                <label className="font-semibold">Nombre de commandes maximum :</label>
                                <p className="text-right">{client.order_limit === null ? "Pas de limite" : `${client.order_limit}`}</p>

                                <label className="font-semibold">{client.order_limit === null ? "Nombre de commandes déjà effectuées ce mois-ci :" : "Commandes restantes ce mois-ci :"}</label>
                                <p className="text-right">{client.order_limit === null ? `${client.current_order}` : `${client.order_limit - client.current_order}`}</p>
                            </div>
                        </div>





                        <div className="border border-rayonblue rounded-lg mt-[1.5em] w-[50vw] p-2">
                            <h2 className="text-rayonblue text-[1.5em] font-semibold">Renouveler votre éligibilité</h2>
                            {activeRequests ? (
                                <p>Une requête est en cours de traitement...</p>
                            ) : (
                                <div className="flex flex-row">
                                    <input
                                        className="bg-rayonorange block w-[40vw] text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 rounded-2xl text-white text-center item-center p-[0.2rem] file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#2E2EFF] file:text-white hover:file:bg-blue-700"
                                        type="file"
                                        onChange={handleFileSelection}
                                        accept=".pdf"
                                        name="fileSelector"
                                        ref={fileInputRef}
                                    ></input>
                                    <button
                                        className="text-rayonorange text-center bg-white w-[10vw] h-[2rem] ml-4 border border-rayonorange"
                                        onClick={handleFileSubmit}
                                    >Valider 🗸</button>
                                </div>)}
                        </div>
                        {!editing ? (
                            <button
                                className="text-white text-center bg-rayonorange w-[30vw] ml-[10vw] mb-3 mt-[10vh] h-[2rem]"
                                onClick={() => {
                                    setEditing(true)
                                    console.log("editmod enabled")
                                }
                                }
                            >Modifier 🖉</button>
                        ) : (
                            <div className="flex flex-row">
                                <button
                                    className="text-white text-center bg-rayonorange w-[14vw] ml-[10vw] mb-3 mt-[10vh] h-[2rem]"
                                    onClick={handleCancel}
                                >Annuler ✖</button>
                                <button
                                    className="text-rayonorange text-center bg-white w-[14vw] ml-[2vw] mb-3 mt-[10vh] h-[2rem] border border-rayonorange"
                                    onClick={handleEdit}
                                >Valider 🗸</button>
                            </div>
                        )
                        }

                    </div>
                ))}
        </>
    )

}

export default Account;