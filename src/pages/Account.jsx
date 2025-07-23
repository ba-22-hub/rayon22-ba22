


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

    const fullAddress = client.address + ' ' + client.addAddress + ', ' + client.postalCode + ' ' + client.city


    return (
        <>
            <div className="w-[66%] ml-[17%] p-[8%] bg-white rounded-2xl shadow-sm mb-[4%]">
                <h1 className="text-center text-rayonblue text-[4.3em] leading-tight pt-[2%] font-bold">Bienvenue sur votre Espace Utilisateur</h1>
                <div className="flex flex-row">
                    <div className="border border-rayonblue rounded-lg mt-[1.5em] w-[48%] p-2">
                        <h2 className="text-rayonblue text-[1.5em] font-semibold">État civil</h2>
                        <div className="flex flex-row text-rayonblue"><label className="font-semibold">Nom : </label><p className="ml-3">{client.lastName}</p></div>
                        <div className="flex flex-row text-rayonblue"><label className="font-semibold">Prénom : </label><p className="ml-3">{client.firstName}</p></div>
                        <div className="flex flex-row text-rayonblue"><label className="font-semibold">Genre : </label><p className="ml-3">{client.gender}</p></div>
                    </div>
                    <div className="border border-rayonblue rounded-lg mt-[1.5em] w-[48%] ml-[4%] p-2">
                        <h2 className="text-rayonblue text-[1.5em] font-semibold">Contact</h2>
                        <div className="flex flex-row text-rayonblue"><label className="font-semibold">E-mail : </label><p className="ml-3">{client.email}</p></div>
                        <div className="flex flex-row text-rayonblue"><label className="font-semibold">Téléphone : </label><p className="ml-3">{client.phone}</p></div>
                        <div className="flex flex-row text-rayonblue"><label className="font-semibold">Addresse : </label><p className="ml-3">{fullAddress}</p></div>
                    </div>
                </div>
                <div className="border border-rayonblue rounded-lg mt-[1.5em] w-[100%] p-2">
                    <h2 className="text-rayonblue text-[1.5em] font-semibold">Déclarations</h2>
                    <div className="flex flex-row text-rayonblue"><label className="font-semibold">Situation : </label><p className="ml-3">{client.situation}</p></div>
                    <div className="flex flex-row text-rayonblue"><label className="font-semibold">Type de salaire : </label><p className="ml-3">{client.wageType}</p></div>
                    <div className="flex flex-row text-rayonblue"><label className="font-semibold">Quotient familial (CAF) : </label><p className="ml-3">{client.quotient}</p></div>

                </div>
                <div className="border border-rayonblue rounded-lg mt-[1.5em] w-[100%] p-2">
                    <h2 className="text-rayonblue text-[1.5em] font-semibold">Vos droits</h2>
                    <div className="flex flex-row text-rayonblue"><label className="font-semibold">Date de validité du compte : </label><p className="ml-3">{}</p></div>
                    <div className="flex flex-row text-rayonblue"><label className="font-semibold">Limite de commande mensuelle : </label><p className="ml-3">{}</p></div>
                    <div className="flex flex-row text-rayonblue"><label className="font-semibold">Reste à commander : </label><p className="ml-3">{}</p></div>
                </div>
                <button className="text-white text-center bg-rayonorange w-[50%] ml-[25%] mb-3 mt-[10%] h-[2rem]">Modifier 🖉</button>

            </div>
        </>
    )



}

export default Account