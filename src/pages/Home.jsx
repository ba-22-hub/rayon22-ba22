// Importing common components
import PageButton from "../common/PageButton"
import LoremIpsum from "../common/LoremIpsum"

// Importing the style
import '../styles/home.css'

// Importing assets
import wideLogo from "../assets/logos/bigLogo.png"
import bigRoundLogo from "../assets/logos/bigRoundLogo.png"
import orangeWoman from "../assets/Photos/giletorange2.png"
import plate from "../assets/Photos/plate.png"
import shape from "../assets/shapes/numberShape.png"

/**
 * The Home page.
 * @returns {React.ReactElement} Home component.
 */
function Home() {
    return (
        <>
            <div className="bluediv">
                <h1>Pour <orange>accéder</orange> à notre épicerie en ligne </h1>
                <div style={{display: "flex"}}>
                    <p>
                        Le <strong>Rayon 22</strong> est une épicerie sociale et solidaire dont l’objectif est d’accompagner les personnes en difficulté financière en leur donnant accès à une alimentation à petits prix sur tout le territoire des Côtes d’Armor.
                        <span style={{ display: 'block', marginTop: '1rem' }}></span>
                        Le <strong>Rayon 22</strong> permet aussi de donner accès à l’aide alimentaire aux personnes qui ne peuvent se rendre aux distributions de nos partenaires.
                        <span style={{ display: 'block', marginTop: '1rem' }}></span>
                        Pour accéder à notre <strong>épicerie en ligne</strong> en point relais, il faut vous connecter à un compte.
                    </p>
                    <img src={wideLogo} style={{width: 700, height: 324}}></img>
                </div>
                <PageButton buttonText={'Se Connecter'} page={'/login'} className="PageButton"></PageButton>
            </div>

            <div className="roundLogo" style={{display: "flex"}}>
                <img src={orangeWoman} style={{width: 600, height: 452}}></img>
                <div>
                    <h2>C'est quoi le principe?</h2>
                    <p>
                        le RAYON 22 est une épicerie
                        solidaire qui propose aux personnes isolées sous conditions de ressources de faire leur course sur internet à petit prix en leur livrant la commande au point relais le plus proche de son domicile.
                    </p>
                    <PageButton buttonText={'En savoir plus'} page={'/more'} className="PageButton"></PageButton>
                </div>
            </div>

            <h2 style={{marginTop: 72, marginLeft: 460}}>Comment commander?</h2>
            <div className="platediv" style={{display: "flex"}}>
                <img className="plate" src={plate}></img>
                <div>
                    <div className="numberedShape">
                        <img className="numberShape" src={shape}></img>
                        <span className="shapeNumber">01</span>
                    </div>
                    <h3>Inscription</h3>
                    <p>
                        Crée ton espace et remplis le formulaire
                        d’inscription.
                    </p>
                    <div className="numberedShape">
                        <img className="numberShape" src={shape}></img>
                        <span className="shapeNumber">02</span>
                    </div>
                    <h3>Étude de dossier</h3>
                    <p>
                        Une fois ton dossier envoyé, il est étudié
                        par notre équipe. Dans certains cas, un rendez-vous avec une assistante sociale de proximité sera nécessaire. Dans tout les cas, une validation des conditions de ressources sera réalisée. Tu peux suivre
                        l’évolution de ton dossier à tout moment.
                    </p>
                    <div className="numberedShape">
                        <img className="numberShape" src={shape}></img>
                        <span className="shapeNumber">03</span>
                    </div>
                    <h3>À vos courses !</h3>
                    <p>
                        Si ton dossier est admis, tu pourras commander et faire tes courses à
                        petit prix !
                    </p>
                    <PageButton buttonText={'Je m\'inscris'} page={'/register'} className="PageButton"></PageButton>
                </div>
            </div>

            <LoremIpsum></LoremIpsum>
        </>
    )
}

export default Home