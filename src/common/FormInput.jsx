function FormInput({ inputText, name, value, onChange }) {
    return (
        <>
            <label>{inputText}</label><br />
            <input type="text" name={name} value={value} onChange={onChange} /><br /><br />
        </>
    );
}

export default FormInput