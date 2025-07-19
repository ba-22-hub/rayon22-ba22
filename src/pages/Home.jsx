// Importing common components
import PageButton from "../common/PageButton"
import LoremIpsum from "../common/LoremIpsum"
import ShapeNumber from "../common/ShapeNumber"

// Styles converted to Tailwind classes

// Importing assets
import wideLogo from "../assets/logos/bigLogo.png"
import orangeWoman from "../assets/Photos/giletorange2.png"
import plate from "../assets/Photos/plate.png"

/**
 * The Home page.
 * @returns {React.ReactElement} Home component.
 */
function Home() {
    return (
        <>
            {/* Hero section with blue background */}
            <div className="text-white bg-rayonblue box-border">
                <h1 className="w-[47vw] h-[8vw] pt-8 pl-20">Pour <span className="text-rayonorange">accéder</span> à notre épicerie en ligne </h1>
                <div className="flex">
                    <p className="ml-20 mt-32 w-[39.31vw] text-xl">
                        Le <strong>Rayon 22</strong> est une épicerie sociale et solidaire dont l'objectif est d'accompagner les personnes pour qui une aide alimentaire représente un soutien non négligeable pour leurs quotidiens, en leur donnant accès à des produits alimentaires à petits prix, partout sur le territoire des Côtes-d'Armor.
                        <span className="block mt-4"></span>
                        Le <strong>Rayon 22</strong>  permet aussi de donner accès à l'aide alimentaire aux personnes qui ne peuvent se rendre aux distributions de nos partenaires.
                        <span className="block mt-4"></span>
                        Afin de pouvoir commander des produits, il vous faut vous connecter à un compte.
                    </p>
                    <img src={orangeWoman} className="mt-12 ml-40 w-[600px] h-[452px]" alt="Woman in orange" />
                </div>
                <div className="mt-4 ml-20 mb-8">
                    <PageButton buttonText={'Se Connecter ➜'} page={'/login'} />
                </div>
            </div>

            {/* Decorative border sections */}
            <div className="flex justify-center">
                <div className="w-1/2 h-52 border border-rayonblue box-border"></div>
                <div className="w-1/2 h-52 border border-rayonblue box-border"></div>
            </div>

            {/* Round logo section */}
            <div className="pt-20 flex">
                <img src={orangeWoman} className="mt-32 ml-28 mr-28 w-[600px] h-[452px]" alt="Woman in orange" />
                <div>
                    <h2 className="mt-44 text-xl font-semibold">C'est quoi le principe?</h2>
                    <p className="w-[450px] text-base leading-relaxed">
                        le RAYON 22 est une épicerie
                        solidaire qui propose aux personnes isolées sous conditions de ressources de faire leur course sur internet à petit prix en leur livrant la commande au point relais le plus proche de son domicile.
                    </p>
                    <div className="mt-7">
                        <PageButton buttonText={'En savoir plus'} page={'/more'} />
                    </div>
                </div>
            </div>

            {/* How to order section */}
            <h2 className="mt-18 ml-[460px] text-xl font-semibold">Comment commander?</h2>
            <div className="mt-18 flex">
                <img className="w-[34.88vw] h-[30.56vw] transform rotate-[7deg] pl-32 pr-60" src={plate} alt="Plate" />
                <div>
                    <ShapeNumber nb={"01"} />
                    <h3 className="mt-0 mb-1 text-lg font-semibold">Inscription</h3>
                    <p className="w-[450px] text-base leading-relaxed">
                        Crée ton espace et remplis le formulaire
                        d'inscription.
                    </p>
                    <ShapeNumber nb={"02"} />
                    <h3 className="mt-0 mb-1 text-lg font-semibold">Étude de dossier</h3>
                    <p className="w-[450px] text-base leading-relaxed">
                        Une fois ton dossier envoyé, il est étudié
                        par notre équipe. Dans certains cas, un rendez-vous avec une assistante sociale de proximité sera nécessaire. Dans tout les cas, une validation des conditions de ressources sera réalisée. Tu peux suivre
                        l'évolution de ton dossier à tout moment.
                    </p>
                    <ShapeNumber nb={"03"} />
                    <h3 className="mt-0 mb-1 text-lg font-semibold">À vos courses !</h3>
                    <p className="w-[450px] text-base leading-relaxed">
                        Si ton dossier est admis, tu pourras commander et faire tes courses à
                        petit prix !
                    </p>
                    <div className="mt-8">
                        <PageButton buttonText={'Je m\'inscris'} page={'/register'} />
                    </div>
                </div>
            </div>

            <LoremIpsum />
        </>
    )
}

export default Home