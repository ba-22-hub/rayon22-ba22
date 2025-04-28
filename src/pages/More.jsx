// Importing common components
import LoremIpsum from "../common/LoremIpsum"

/**
 * The More page.
 * @returns {React.ReactElement} More component.
 */
function More() {
    return (
        <>
            <h1>Toujours plus !</h1>
            
            <h2>Infos pratique</h2>
            <LoremIpsum></LoremIpsum>

            <h2>Retours presse</h2>
            <LoremIpsum></LoremIpsum>
        </>
    )
}

export default More