import PageButton from "../common/PageButton"
import LoremIpsum from "../common/LoremIpsum"

function Home() {
    return (
        <>
            <h1>This is the Home Page</h1>
            <LoremIpsum></LoremIpsum>
            <PageButton buttonText={'Se Connecter'} page={'/login'}></PageButton>
            <LoremIpsum></LoremIpsum>
            <PageButton buttonText={'En savoir plus'} page={'/more'}></PageButton>
            <LoremIpsum></LoremIpsum>
            <PageButton buttonText={'Je m\'inscris'} page={'/register'}></PageButton>
            <LoremIpsum></LoremIpsum>
        </>
    )
}

export default Home