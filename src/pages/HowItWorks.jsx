// Importing common components
import LoremIpsum from "../common/LoremIpsum"
import PageButton from "../common/PageButton"

/**
 * The How It Works page.
 * @returns {React.ReactElement} HowItWorks component.
 */
function HowItWorks() {
    return (
        <>
            <h1>Quand je veux où je veux !</h1>
            <p>
                Je commande par internet quand je veux à mon épicerie solidaire et je me fais livrer où je veux en point relais près de chez moi ou de mon lieu d’étude.

                Les prix sont encadrés entre 10% et 30% de leur valeur en magasin. J’ai le choix de produits variés en alimentaire (produit secs) ou d’hygiène et d’entretien avec toutefois une limitation mensuelle par mois.

                L’inscription est indispensable car l’accès à l’épicerie en ligne est sous conditions de ressources.
            </p>
            <PageButton buttonText={'Se Connecter'} page={'/login'}></PageButton>

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