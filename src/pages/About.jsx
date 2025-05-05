// Importing common components
import LoremIpsum from "../common/LoremIpsum"

// Importing assets
import basket from "../assets/Photos/basket.png"
import birdLogo from "../assets/logos/birdLogo.png"

// Importing the style
import '../styles/about.css'

/**
 * The About page.
 * @returns {React.ReactElement} About component.
 */
function About() {
    return (
        <>
            <div className="bluediv3">
                <h1>Les banques alimentaires, premier <orange>réseau</orange> de distribution d’aide alimentaire en <orange>France</orange></h1>
                <p>
                    Le <strong>Rayon 22</strong> est une épicerie sociale et solidaire dont l’objectif est d’accompagner les personnes en difficulté financière en leur donnant accès à une alimentation à petits prix sur tout le territoire des Côtes d’Armor.
                    <span style={{ display: 'block', marginTop: '1rem' }}></span>
                    Le <strong>Rayon 22</strong> permet aussi de donner accès à l’aide alimentaire aux personnes qui ne peuvent se rendre aux distributions de nos partenaires.
                    <span style={{ display: 'block', marginTop: '1rem' }}></span>
                    Pour accéder à notre <strong>épicerie en ligne</strong> en point relais, il faut vous connecter à un compte.
                </p>
            </div>

            <div className="basketdiv" style={{display: "flex"}}>
                <div>
                    <h2>La banque alimentaire des côtes d’Armor</h2>
                    <div style={{display: "flex"}}>
                        <img src={birdLogo} style={{height: 225, width: 225}}></img>
                        <p>
                            La banque alimentaire des côtes d’Armor a été créée le 16 octobre 1984,  elle est pionnière en la matière ! 
                            <span style={{ display: 'block', marginTop: '1rem' }}></span>
                            Avec le Rayon 22 Epicerie en ligne, la Banque Alimentaire des Côtes d’Armor innove dans le domaine de la distribution alimentaire
                        </p>
                    </div>
                </div>
                <img src={basket} className="basket"></img>
            </div>
        </>
    )
}

export default About