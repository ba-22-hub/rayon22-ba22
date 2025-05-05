// Importing common components
import LoremIpsum from "../common/LoremIpsum"
import PageButton from "../common/PageButton"

// Importing the style
import '../styles/how.css'

/**
 * The How It Works page.
 * @returns {React.ReactElement} HowItWorks component.
 */
function HowItWorks() {
    return (
        <>
            <div className="bluediv2">
                <h1>Quand je <orange>veux</orange> où je <orange>veux</orange> !</h1>
                <p>
                    <strong>Je commande</strong> par internet quand je veux à mon épicerie solidaire et je me fais livrer où je veux en <strong>point relais</strong> près de chez moi ou de mon lieu d’étude.
                    <span style={{ display: 'block', marginTop: '1rem' }}></span>
                    Les prix sont encadrés entre <strong>10% et 30%</strong> de leur valeur en magasin. J’ai le choix de produits variés en alimentaire (produit secs) ou d’hygiène et d’entretien avec toutefois une <strong>limitation mensuelle par mois</strong>.
                    <span style={{ display: 'block', marginTop: '1rem' }}></span>
                    <strong>L’inscription est indispensable</strong> car l’accès à l’épicerie en ligne est sous conditions de ressources.
                </p>
                <PageButton buttonText={'Se Connecter'} page={'/login'}></PageButton>
            </div>

            <h2>Un contact si besoin</h2>
            <p>
                Lors de l’inscription, je serai rappelé pour formaliser mon dossier.

                Si nécessaire un rendez vous avec une assistante sociale de proximité sera pris.

                A tout moment, je peux contacter la Banque Alimentaire par mail pour un problème  de fonctionnement ou concernant ma situation personnelle. Nous vous répondrons en fonction de nos horaires d’ouverture
            </p>
            <PageButton buttonText={'Contactez nous'} page={'/contact'}></PageButton>

            <h2>Et beaucoup plus...</h2>
            <p>
                Nous mettons à votre disposition des recettes de cuisine, des informations pratiques, des promos, des animations...
            </p>
            <PageButton buttonText={'Toujours plus'} page={'/more'}></PageButton>
        </>
    )
}

export default HowItWorks