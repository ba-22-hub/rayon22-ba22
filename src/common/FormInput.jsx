/**
 * A basic string input.
 * @param {Object} props - The component props.
 * @param {string} props.inputText - The input label content.
 * @param {string} props.name - The field name in the JSON object.
 * @param {string} props.value - The value entered by the customer.
 * @param {(e: any) => void} props.onChange - The function to call whenever the value changes.
 * @returns {React.ReactElement} FormInput component.
 */
function FormInput({ inputText, name, value, onChange }) {
    return (
        <>
            <label>{inputText}</label><br />
            <input type="text" name={name} value={value} onChange={onChange} /><br /><br />
        </>
    );
}

export default FormInput