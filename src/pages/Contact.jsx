import LoremIpsum from "../common/LoremIpsum"
import FormInput from "../common/FormInput"
import FormTextArea from "../common/FormTextArea"

function Contact() {
    return (
        <>
            <h1>This is the Contact Page</h1>
            <LoremIpsum></LoremIpsum>
            <div>
                <h1>Formulaire de contact</h1>
                <form>
                    <FormInput inputText={'Prénom :'}></FormInput>
                    <FormInput inputText={'Nom :'}></FormInput>
                    <FormInput inputText={'Adresse e-mail :'}></FormInput>
                    <FormInput inputText={'Téléphone :'}></FormInput>
                    <FormTextArea textAreaName={'Message :'}></FormTextArea>
                    <button>Envoyer</button>
                </form>
            </div>
        </>
    )
}

export default Contact