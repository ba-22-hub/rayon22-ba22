// Importing the style
import '../styles/ShapeNumber.css'

// Importing the assets
import shape from "../assets/shapes/numberShape.png"

/**
 * A shape with a number in it.
 * @param {String} nb - the number to put in the shape.
 * @returns {React.ReactElement} ShapeNumber component.
 */
function ShapeNumber({nb}) {
    return (
        <div className="numberedShape">
            <img className="numberShape" src={shape}></img>
            <span className="shapeNumber">{nb}</span>
        </div>
    )
}

export default ShapeNumber