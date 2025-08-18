
import imageMail from '@assets/shapes/sendedMail.png';




function RegisterStep4({ mail }) {



    return (
        <>
            <div className='flex items-center w-[100%] justify-center mt-[5%] '>
                <img className="w-[40%] h-[40%]" src={imageMail} />
            </div>
            <h2 className='text-center text-rayonblue text-[3.2em] leading-tight pt-[2%] font-bold'>Email de confirmation</h2>
            <p className='text-center mr-[8%] ml-[8%] mt-8'><black>Un email de confirmation a été envoyé à  </black><span className="email">{mail}</span><black> afin de vérifier la validité de l'adresse. Une fois reçu, veuillez cliquer sur le lien pour finaliser votre inscription</black></p>
            <button className='text-center-white w-[50%] ml-[25%] mb-[3%] mt-[5%] h-[2rem] bg-rayonorange'>Re-envoyer le mail</button>
        </>
    )
}



export default RegisterStep4;