/**
 * A basic textbox input.
 * @param {Object} props - The component props. 
 * @param {string} props.textAreaName - The input label content.
 * @param {string} props.name - The field name in the JSON object.
 * @param {string} props.value - The value entered by the customer.
 * @param {(e: any) => void} props.onChange - The function to call whenever the value changes.
 * @returns {React.ReactElement} FormTextArea component.
 */
function FormTextArea({ textAreaName, name, value, onChange }) {
    return (
        <>
            <label>{textAreaName}</label><br />
            <textarea name={name} value={value} onChange={onChange} style={{resize: "none"}} /><br /><br />
        </>
    );
}

export default FormTextArea