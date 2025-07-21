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
        <div>
            <div><label>{inputText}</label></div>
            <div><input className="border border-[#2E2EFF] rounded-md text-sm px-4 py-2 w-full" type="text" name={name} value={value} onChange={onChange} /></div>
        </div>
    );
}

export default FormInput