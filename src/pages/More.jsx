// Importing common components
import LoremIpsum from "../common/LoremIpsum"

// Importing the style
import '../styles/more.css'

// Importing assets
import student from "../assets/Photos/etudiante1.png"

/**
 * The More page.
 * @returns {React.ReactElement} More component.
 */
function More() {
    return (
        <>
            <div className="bluediv4">
                <h1>Toujours plus !</h1>
                <img src={student}></img>
            </div>
            
            <div className="divInfo">
                <h2>Infos pratique</h2>
                <LoremIpsum></LoremIpsum>
            </div>

            <div className="divPresse">
                <h2>Retours presse</h2>
                <LoremIpsum></LoremIpsum>
            </div>
        </>
    )
}

export default More