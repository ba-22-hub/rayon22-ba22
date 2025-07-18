/**
 * A basic string input.
 * @param {Object} props - The component props.
 * @param {string} props.inputText - The input label content.
 * @param {string} props.name - The field name in the JSON object.
 * @param {string} props.value - The value entered by the customer.
 * @param {(e: any) => void} props.onChange - The function to call whenever the value changes.
 * @returns {React.ReactElement} FormInput component.
 */
function FormInput({ inputText, name, value, onChange, isStarred = false }) {
    // If the input is starred, add a red asterisk to the label
    if (isStarred) {
        return (
        <div>
            <div><label>{inputText} <red>*</red></label></div>
            <div><input className="FormInput" type="text" name={name} value={value} onChange={onChange} required /></div>
        </div>
    );
    
    } else {
        return (
            <div>
                <div><label>{inputText}</label></div>
                <div><input className="FormInput" type="text" name={name} value={value} onChange={onChange} /></div>
            </div>
        );
    }
}

export default FormInput