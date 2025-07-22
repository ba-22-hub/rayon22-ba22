// Importing dependencies
import { useNavigate } from 'react-router-dom';

// Importing common components
import FunctionButton from "./FunctionButton"
/**
 * A button to navigate to a particular page on the website.
 * @param {Object} props - The component props. 
 * @param {string} props.className - The Tailwind class to apply to the button.
 * @param {string} props.buttonText - The button label. 
 * @param {string} props.page - The route the button takes. 
 * @returns {React.ReactElement} PageButton component.
 */
function PageButton({className, buttonText, page}) {
    // useNavigate returns a function that needs to be stored to be used
    const navigate = useNavigate();

    return (
      <FunctionButton className={className} buttonText={buttonText} fun={() => {navigate(page);}}></FunctionButton>
    );
}

export default PageButton