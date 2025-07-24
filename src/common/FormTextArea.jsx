/**
 * A basic textbox input.
 * @param {Object} props - The component props. 
 * @param {string} props.className - The Tailwind class to apply to the textarea.
 * @param {string} props.textAreaName - The input label content.
 * @param {string} props.name - The field name in the JSON object.
 * @param {string} props.value - The value entered by the customer.
 * @param {(e: any) => void} props.onChange - The function to call whenever the value changes.
 * @param {boolean} [props.isStarred=false] - Whether the field is required (starred).
 * @returns {React.ReactElement} FormTextArea component.
 */
function FormTextArea({ className, textAreaName, name, value, onChange, isStarred = false }) {
    return (
        <>
            <label className="text-rayonblue">{textAreaName}{isStarred &&( <a className="text-red"> *</a>)}</label><br />
            <textarea className={className} name={name} value={value} onChange={onChange} style={{resize: "none"}} /><br /><br />
        </>
    );
}

export default FormTextArea