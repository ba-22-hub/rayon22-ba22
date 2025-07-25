// Importing style
import '../styles/FunctionButton.css'

/**
 * A button to call a particular function when clicked.
 * @param {Object} props - The component props. 
 * @param {string} props.className - The Tailwind class to apply to the button.
 * @param {string} props.buttonText - The button label. 
 * @param {(e: any) => any} props.fun - The function to call when the button is clicked. 
 * @returns {React.ReactElement} FunctionButton component.
 */
function FunctionButton({className, buttonText, fun}) {
    return (
        <div>
          <button className={className} onClick={fun}>
            {buttonText}
          </button>
        </div>
      );
}

export default FunctionButton