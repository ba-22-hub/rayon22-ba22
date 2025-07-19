// Importing common components
import LoremIpsum from "../common/LoremIpsum"
import PageButton from "../common/PageButton"

// Importing assets
import mosaique from "../assets/Photos/mosaique.png"
import bigRoundLogo from "../assets/logos/bigRoundLogo.png"
import holdingApple from "../assets/Photos/holdingApple.jpg"

/**
 * The How It Works page.
 * @returns {React.ReactElement} HowItWorks component.
 */
function HowItWorks() {
    return (
        <>
            {/* Hero section with blue background */}
            <div className="text-white bg-gradient-to-b from-[#3435FF] via-[#2526B7] to-[#1F2099] box-border pl-20 flex">
                <div>
                    <h1 className="w-[44.81vw] mb-8">Faites vos <span className="text-rayonorange">courses</span> à petit prix en ligne et recevez-les près de <span className="text-rayonorange">chez vous !</span></h1>
                    <p>
                        <strong>Je commande</strong> par internet quand je veux à mon épicerie solidaire et je me fais livrer où je veux en <strong>point relais</strong> près de chez moi ou de mon lieu d'étude.
                        <span className="block mt-4"></span>
                    </p>
                    <p className="text-3xl mt-0 mb-0">
                        <strong><span className="text-rayonorange">Un accès équitable</span> à l'essentiel : Payez moins et choisissez mieux.</strong>
                    </p>
                    <p>
                        <span className="block mt-4"></span>
                        Les prix sont encadrés entre <strong>10% et 30%</strong> de leur valeur en magasin. J'ai le choix de produits variés en alimentaire (produit secs) ou d'hygiène et d'entretien avec toutefois une <strong>limitation mensuelle par mois</strong>.
                        <span className="block mt-4"></span>
                        <strong>L'inscription est indispensable</strong> car l'accès à l'épicerie en ligne est sous conditions de ressources.
                    </p>
                    <div className="mb-9">
                        <PageButton buttonText={'Se Connecter ➜'} page={'/login'} />
                    </div>
                </div>
                <img src={mosaique} className="w-[555px] h-[469px] mr-32 mt-5" alt="Mosaique" />
            </div>

            {/* Info livraison section */}
            <div className="mt-32 flex justify-center items-center flex-col">
                <h2>Infos livraison</h2>
                <div>
                    <img src={holdingApple} className="w-[520px] h-[419px] transform rotate-[5.83deg] mt-28 ml-32" alt="Holding Apple" />
                </div>
            </div>

            {/* Contact and more info section */}
            <div className="pl-20 flex">
                <div>
                    <h2>Un contact si besoin</h2>
                    <p className="w-[515px]">
                        Lors de l'inscription, je serai rappelé pour formaliser mon dossier.
                        <span className="block mt-4"></span>
                        Si nécessaire un rendez vous avec une assistante sociale de proximité sera pris.
                        <span className="block mt-4"></span>
                        A tout moment, je peux contacter la Banque Alimentaire par mail pour un problème  de fonctionnement ou concernant ma situation personnelle. Nous vous répondrons en fonction de nos horaires d'ouverture
                    </p>
                    <PageButton buttonText={'Contactez nous'} page={'/contact'} />

                    <h2 className="mt-20">Et beaucoup plus...</h2>
                    <p className="w-[387px]">
                        Nous mettons à votre disposition des recettes de cuisine, des informations pratiques, des promos, des animations...
                    </p>
                    <PageButton buttonText={'Toujours plus'} page={'/more'} />
                </div>
                <img src={bigRoundLogo} className="w-[700px] h-[700px] mt-10 mb-12 ml-36" alt="Big Round Logo" />
            </div>
        </>
    )
}

export default HowItWorks