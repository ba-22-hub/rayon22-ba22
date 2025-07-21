// Importing common components
import LoremIpsum from "../common/LoremIpsum"

// Importing assets
import student from "../assets/Photos/etudiante1.png"

/**
 * The More page.
 * @returns {React.ReactElement} More component.
 */
function More() {
    return (
        <>
            {/* Hero section with blue background */}
            <div className="bg-gradient-to-b from-[#3435FF] via-[#2526B7] to-[#1F2099] h-[527px] text-white">
                <h1 className="ml-[480px] pt-10 mb-12 text-7xl font-bold">Toujours plus !</h1>
                <img src={student} className="w-full h-[411px] object-cover" alt="Student" />
            </div>
            
            {/* Info pratique section */}
            <div className="pt-20">
                <h2 className="ml-20 text-4xl text-[#3435FF] font-semibold mb-4">Infos pratique</h2>
                <LoremIpsum />
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