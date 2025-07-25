import { Input } from "postcss"
import { useState } from "react"



function Account({ client }) {
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
    const [clientEdit, setClientEdit] = useState(client)
    const genderOptions = ["male", "female", "other"]
    const situationOptions = ["employee", "jobless", "student", "retired"]
    const wageOptions = ["salary", "scholarship", "help", "other"]

    function handleChange(e) {
        const { name, value } = e.target;
        if (name == "wageType" && value == "other") {
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

    function handleEdit() {
        console.log("sending ", clientEdit, "to API...")
        setEditing(false)
    }

    // on factorise l'élément le plus volumineux 
    const renderField = (label, fieldName) => (
        <div className="flex flex-row text-rayonblue">
            <label className="font-semibold w-[23%] mt-2 mb-2">{label} : </label>
            {editing ? (
                <input
                    className="ml-3 border border-rayonorange rounded-lg w-[78%] mt-1 mb-1 text-rayonorange"
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
            <label className="font-semibold w-[23%] mt-2 mb-2">{label} :</label>
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
            <div className="w-[66%] ml-[17%] p-[8%] bg-white rounded-2xl shadow-sm mb-[4%]">
                <h1 className="text-center text-rayonblue text-[4.3em] leading-tight pt-[2%] font-bold">Bienvenue sur votre Espace Utilisateur</h1>
                <div className="flex flex-row">
                    <div className="border border-rayonblue rounded-lg mt-[1.5em] w-[49%] p-2">
                        <h2 className="text-rayonblue text-[1.5em] font-semibold">État civil</h2>
                        {renderField("Nom", "lastName")}
                        {renderField("Prénom", "firstName")}
                        {renderRadio("Genre", "gender", genderOptions)}

                    </div>
                    <div className="border border-rayonblue rounded-lg mt-[1.5em] w-[49%] ml-[2%] p-2">
                        <h2 className="text-rayonblue text-[1.5em] font-semibold">Contact</h2>
                        {renderField("E-mail", "email")}
                        {renderField("Téléphone", "phone")}
                        {renderField("Adresse", "address")}
                        {renderField("Précisions", "addAddress")}
                        {renderField("Ville", "city")}
                        {renderField("Code postal", "phone")}
                    </div>
                </div>
                <div className="border border-rayonblue rounded-lg mt-[1.5em] w-[100%] p-2">
                    <h2 className="text-rayonblue text-[1.5em] font-semibold">Déclarations</h2>
                    {renderRadio("Situation", "situation", situationOptions)}
                    {renderField("Quotient familial (CAF)", "quotient")}
                    {renderRadio("Type de salaire", "wageType", wageOptions)}
                </div>
                <div className="border border-rayonblue rounded-lg mt-[1.5em] w-[100%] p-2">
                    <h2 className="text-rayonblue text-[1.5em] font-semibold">Vos droits</h2>
                    <div className="flex flex-row text-rayonblue"><label className="font-semibold">Date de validité du compte : </label><p className="ml-3">{ }</p></div>
                    <div className="flex flex-row text-rayonblue"><label className="font-semibold">Limite de commande mensuelle : </label><p className="ml-3">{ }</p></div>
                    <div className="flex flex-row text-rayonblue"><label className="font-semibold">Reste à commander : </label><p className="ml-3">{ }</p></div>
                </div>
                {!editing ? (
                    <button
                        className="text-white text-center bg-rayonorange w-[50%] ml-[25%] mb-3 mt-[10%] h-[2rem]"
                        onClick={() => {
                            setEditing(true)
                            console.log("editmod enabled")
                        }
                        }
                    >Modifier 🖉</button>
                ) : (
                    <div className="flex flex-row">
                        <button
                            className="text-white text-center bg-rayonorange w-[24%] ml-[25%] mb-3 mt-[10%] h-[2rem]"
                            onClick={handleCancel}
                        >Annuler ✖</button>
                        <button
                            className="text-rayonorange text-center bg-white w-[24%] ml-[2%] mb-3 mt-[10%] h-[2rem] border border-rayonorange"
                            onClick={handleEdit}
                        >Valider 🗸</button>
                    </div>
                )
                }
            </div>
        </>
    )



}


export default Account;