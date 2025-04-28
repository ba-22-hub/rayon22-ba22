function FormTextArea({ textAreaName, name, value, onChange }) {
    return (
        <>
            <label>{textAreaName}</label><br />
            <textarea name={name} value={value} onChange={onChange} /><br /><br />
        </>
    );
}

export default FormTextArea