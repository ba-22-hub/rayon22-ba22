// Importing the assets
import shape from "../assets/shapes/numberShape.png"

/**
 * A shape with a number in it.
 * @param {String} className - The Tailwind class to apply to the shape.
 * @param {String} nb - the number to put in the shape.
 * @returns {React.ReactElement} ShapeNumber component.
 */
function ShapeNumber({ className, nb }) {
    return (
        <div className={className}>
        <div className="relative inline-block w-fit">
            <img className="w-12 h-12 mt-[2.625rem]" src={shape} alt="" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[25%] text-white font-bold text-xl">
                {nb}
            </span>
        </div>
        </div>
    );
}

export default ShapeNumber