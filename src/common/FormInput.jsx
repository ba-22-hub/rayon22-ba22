/**
 * A basic string input.
 * @param {Object} props - The component props.
 * @param {string} props.className - The Tailwind class to apply to the input.
 * @param {string} props.inputText - The input label content.
 * @param {string} props.name - The field name in the JSON object.
 * @param {string} props.value - The value entered by the customer.
 * @param {(e: any) => void} props.onChange - The function to call whenever the value changes.
 * @returns {React.ReactElement} FormInput component.
 */

function FormInput({ className, inputText, name, value, onChange, isStarred = false }) {

    return (
        <div>
            <div><label className="text-rayonblue ml-[8%]">{inputText}{isStarred &&( <a className="text-red"> *</a>)}</label></div>
            {isStarred && (<div><input className={className} type="text" name={name} value={value} onChange={onChange} required/></div>)}
            {!isStarred && (<div><input className={className} type="text" name={name} value={value} onChange={onChange} /></div>)}
        </div>
)}



export default FormInput

