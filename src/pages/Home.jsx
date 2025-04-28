// Importing common components
import PageButton from "../common/PageButton"
import LoremIpsum from "../common/LoremIpsum"

/**
 * The Home page.
 * @returns {React.ReactElement} Home component.
 */
function Home() {
    return (
        <>
            <h1>Pour accéder à notre épicerie en ligne </h1>
            <p>
            Le Rayon 22 est une épicerie sociale et solidaire dont l’objectif est d’accompagner les personnes en difficulté financière en leur donnant accès à une alimentation à petits prix sur tout le territoire des Côtes d’Armor.

            Le Rayon 22 permet aussi de donner accès à l’aide alimentaire aux personnes qui ne peuvent se rendre aux distributions de nos partenaires.

            Pour accéder à notre épicerie en ligne en point relais, il faut vous connecter à un compte.
            </p>
            <PageButton buttonText={'Se Connecter'} page={'/login'}></PageButton>

            <h2>C'est quoi le principe?</h2>
            <p>
                le RAYON 22 est une épicerie
                solidaire qui propose aux personnes isolées sous conditions de ressources de faire leur course sur internet à petit prix en leur livrant la commande au point relais le plus proche de son domicile.
            </p>
            <PageButton buttonText={'En savoir plus'} page={'/more'}></PageButton>

            <h2>Comment commander?</h2>
            <h3>Inscription</h3>
            <p>
                Crée ton espace et remplis le formulaire
                d’inscription.
            </p>
            <h3>Étude de dossier</h3>
            <p>
                Une fois ton dossier envoyé, il est étudié
                par notre équipe. Dans certains cas, un rendez-vous avec une assistante sociale de proximité sera nécessaire. Dans tout les cas, une validation des conditions de ressources sera réalisée. Tu peux suivre
                l’évolution de ton dossier à tout moment.
            </p>
            <h3>À vos courses !</h3>
            <p>
                Si ton dossier est admis, tu pourras commander et faire tes courses à
                petit prix !
            </p>
            <PageButton buttonText={'Je m\'inscris'} page={'/register'}></PageButton>

            <LoremIpsum></LoremIpsum>
        </>
    )
}

export default Home