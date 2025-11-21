// Importing common components
import LoremIpsum from "@common/LoremIpsum"
import PageButton from "@common/PageButton"

// Importing assets
import student from "@assets/Photos/etudiante1.png"

/**
 * The More page.
 * @returns {React.ReactElement} More component.
 */
function More() {
    return (
        <>
            {/* Hero section with blue background */}
            <div className="bg-gradient-to-b from-[#3435FF] via-[#2526B7] to-[#1F2099] lg:h-[527px] text-white">
                <h1 className="ml-12 lg:ml-[480px] py-10  mb-120  text-5xl lg:text-7xl font-bold">Toujours plus !</h1>
                <img src={student} className="hidden lg:flex w-full h-[411px] object-cover" alt="Student" />
            </div>

            {/* Info pratique section */}
            <div className="pt-20">
                <h2 className="ml-20 text-4xl text-[#3435FF] font-semibold mb-4">Infos pratique</h2>
                <p className="text-rayonblue pl-10">Des <a className="text-rayonorange underline" href="https://solidarites.gouv.fr/tous-les-contacts-utiles">numéros utiles</a></p><br />
                <p className="text-rayonblue pl-10"><a className="text-rayonorange underline" href="https://soliguide.fr/fr">Soliguide</a> accès aux services solidaires gratuits</p><br />
                <p className="text-rayonblue pl-10">Le<a className="text-rayonorange underline" href="https://www.mesdroitssociaux.gouv.fr/votre-simulateur/accueil"> simulateur </a>des droits sociaux</p><br />
                <PageButton
                    className="text-rayonorange underline pl-10"
                    buttonText="Une question ? Un message ?"
                    page="/contact"
                />
            </div>

            {/* Retours presse section */}
            <div className="pt-36">
                <h2 className="ml-20 text-4xl text-[#3435FF] font-semibold mb-4">Retours presse</h2>
                <LoremIpsum />
            </div>
        </>
    )
}

export default More