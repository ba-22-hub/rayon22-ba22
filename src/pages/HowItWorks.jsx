// Importing common components
import LoremIpsum from "../common/LoremIpsum"
import PageButton from "../common/PageButton"

// Importing the style
import '../styles/how.css'

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
            <div className="bluediv2" style={{display: 'flex'}}>
                <div>
                    <h1>Faites vos <orange>courses</orange> à petit prix en ligne et recevez-les près de <orange>chez vous !</orange></h1>
                    <p>
                        <strong>Je commande</strong> par internet quand je veux à mon épicerie solidaire et je me fais livrer où je veux en <strong>point relais</strong> près de chez moi ou de mon lieu d’étude.
                        <span style={{ display: 'block', marginTop: '1rem' }}></span>
                    </p>
                    <p className="biggerP">
                        <strong><orange>Un accès équitable</orange> à l’essentiel : Payez moins et choisissez mieux.</strong>
                    </p>
                    <p>
                        <span style={{ display: 'block', marginTop: '1rem' }}></span>
                        Les prix sont encadrés entre <strong>10% et 30%</strong> de leur valeur en magasin. J’ai le choix de produits variés en alimentaire (produit secs) ou d’hygiène et d’entretien avec toutefois une <strong>limitation mensuelle par mois</strong>.
                        <span style={{ display: 'block', marginTop: '1rem' }}></span>
                        <strong>L’inscription est indispensable</strong> car l’accès à l’épicerie en ligne est sous conditions de ressources.
                    </p>
                    <PageButton buttonText={'Se Connecter ➜'} page={'/login'}></PageButton>
                </div>
                <img src={mosaique} style={{width: 555, height: 469}}></img>
            </div>

            <div className="infoDiv" style={{display: 'flex'}}>
                <h2>Infos livraison</h2>
                <div>
                    <img src={holdingApple}></img>
                </div>
            </div>

            <div className="div2" style={{display: 'flex'}}>
                <div>
                    <h2>Un contact si besoin</h2>
                    <p className="p1">
                        Lors de l’inscription, je serai rappelé pour formaliser mon dossier.
                        <span style={{ display: 'block', marginTop: '1rem' }}></span>
                        Si nécessaire un rendez vous avec une assistante sociale de proximité sera pris.
                        <span style={{ display: 'block', marginTop: '1rem' }}></span>
                        A tout moment, je peux contacter la Banque Alimentaire par mail pour un problème  de fonctionnement ou concernant ma situation personnelle. Nous vous répondrons en fonction de nos horaires d’ouverture
                    </p>
                    <PageButton buttonText={'Contactez nous'} page={'/contact'}></PageButton>

                    <h2 className="h2">Et beaucoup plus...</h2>
                    <p className="p2">
                        Nous mettons à votre disposition des recettes de cuisine, des informations pratiques, des promos, des animations...
                    </p>
                    <PageButton buttonText={'Toujours plus'} page={'/more'}></PageButton>
                </div>
                <img src={bigRoundLogo} style={{width: 700, height: 700}}></img>
            </div>
        </>
    )
}

export default HowItWorks