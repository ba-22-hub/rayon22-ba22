import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { supabase } from '@lib/supabaseClient.js';
import { useAuthor } from "../context/AuthorContext.jsx";
import { uploadPDF } from '@lib/sendPDF.js'



function Account() {
    /**
     * Format attendu pour le client : 
     * birthday: "0023-09-23"
     * email: "no@martin.bzh"
     * firstName: "Nolwenn"
     * gender: "female"
     * lastName: "Martin"​​
     * phone: "0943439843"
     * acceptTerms: true
     * addAddress: ""
     * address: "25 rue de la lune "
     * city: "Brest"
     * otherWage: ""
     * postalCode: "29000"
     * quotient: "un certain nombre"
     * readInfo: true
     * situation: "jobless"​
     * wageType: undefined
    */




    const [editing, setEditing] = useState(false)
    const [clientEdit, setClientEdit] = useState(null)
    const [client, setClient] = useState(null)
    const [file, setFile] = useState(null)
    const [activeRequests, setActiveRequest] = useState(false)
    const { user, logout, loading } = useAuthor()

    const fileInputRef = useRef(null);


    // options for the radio buttons when the edit mod is enable
    const genderOptions = ["Homme", "Femme", "Autre"]
    const situationOptions = ["Employé", "Sans emploi", "Étudiant", "Retraité"]
    const wageOptions = ["Salaire", "Bourse", "Aide", "Autre"]

    let navigate = useNavigate()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // retrieving user's data
                const uid = user.id
                console.log(user)
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
                const { data, error : dberror } = await supabase
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
        fetchUserData()
            .then(()=> checkRequest()) 
    }, [user])



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
        const uploadSuccess = true
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

        alert("La requête à bien été prise en compte ! ")

    }

    function handleDeconnection() {
        logout()
        console.log("Deconnexion...")
        navigate('/login')
    }

    // on factorise l'élément le plus volumineux 
    const renderField = (label, fieldName) => (
        <div className="flex flex-row text-rayonblue align-center items-center">
            <label className="font-semibold w-[7vw] mt-2 mb-2">{label} : </label>
            {editing ? (
                <input
                    className="ml-3 border border-rayonorange rounded-lg w-[20vw] mt-1 mb-1 text-rayonorange pl-2 h-[1.5rem]"
                    name={fieldName}
                    value={clientEdit[fieldName]}
                    onChange={handleChange}
                />
            ) : (
                <p className="ml-3 mt-2 mb-2">{clientEdit[fieldName]}</p>
            )}
        </div>
    )

    const renderRadio = (label, fieldName, options) => (
        <div className="flex flex-row text-rayonblue mb-2">
            <label className="font-semibold w-[7vw] mt-2 mb-2">{label} :</label>
            {editing ? (
                <div className="flex text-rayonorange">
                    {options.map((option) => (
                        <label key={option} className="flex items-center ml-4">
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
                <p className="ml-3 mt-2 mb-2">{clientEdit[fieldName]}</p>
            )}
        </div>
    );

    return (
        <>
            {loading || !clientEdit ? (
                <p>Chargement des données... </p>
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
                        <div className="border border-rayonblue rounded-lg mt-[1.5em] w-[24vw] ml-[2vw] p-2">
                            <h2 className="text-rayonblue text-[1.5em] font-semibold">Contact</h2>
                            {renderField("E-mail", "email")}
                            {renderField("Téléphone", "phone")}
                            {renderField("Adresse", "address")}
                            {renderField("Précisions", "addAddress")}
                            {renderField("Ville", "city")}
                            {renderField("Code postal", "phone")}
                        </div>
                    </div>
                    <div className="border border-rayonblue rounded-lg mt-[1.5em] w-[50vw] p-2">
                        <h2 className="text-rayonblue text-[1.5em] font-semibold">Déclarations</h2>
                        {renderRadio("Situation", "situation", situationOptions)}
                        {renderField("Quotient familial (CAF)", "quotient")}
                        {renderRadio("Type de salaire", "wageType", wageOptions)}
                    </div>
                    <div className="border border-rayonblue rounded-lg mt-[1.5em] w-[50vw] p-2">
                        <h2 className="text-rayonblue text-[1.5em] font-semibold">Vos droits</h2>
                        <div className="flex flex-row text-rayonblue"><label className="font-semibold">Date de validité du compte : </label><p className="ml-3">{ }</p></div>
                        <div className="flex flex-row text-rayonblue"><label className="font-semibold">Limite de commande mensuelle : </label><p className="ml-3">{ }</p></div>
                        <div className="flex flex-row text-rayonblue"><label className="font-semibold">Reste à commander : </label><p className="ml-3">{ }</p></div>
                    </div>
                    <div className="border border-rayonblue rounded-lg mt-[1.5em] w-[50vw] p-2">
                        <h2 className="text-rayonblue text-[1.5em] font-semibold">Renouveler votre éligibilité</h2>
                        { activeRequests ? (
                            <p>Une requête est en cours de traitement...</p>
                        ): (
                        <div className="flex flex-row">
                            <input
                                className="bg-rayonorange w-[40vw] h-[2rem] rounded-2xl text-white text-center item-center p-[0.2rem] "
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
            )}
        </>
    )
}

export default Account;