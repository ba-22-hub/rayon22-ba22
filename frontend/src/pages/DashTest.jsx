import { deletePDF } from "@lib/deletePDF"
import { sendPDF } from "@lib/sendPDF"
import { openPDF } from "@lin/openPDF"
import { useState } from "react"

function DashTest() {
    const [file, setFile] = useState(null)
    const [delFile, setDelFile] = useState(null)
    const [openFile, setOpenFile] = useState(null)

    function handleDelChange(e) {
        setDelFile(e.target.value)
    }

    function handleOpenChange(e){
        setOpenFile(e.target.value)
    }

    function handleFileSelection(e) {
        console.log("Un fichier a été déposé")
        const incomingFile = e.target.files[0]
        console.log(incomingFile)
        setFile(incomingFile)
        console.log(incomingFile.name)
    }

    function handleFileSubmit() {
        sendPDF(file)
        alert("Le fichier " + file.name + "a bien été envoyé")
    }
    return (
        <>
            <div className="bg-[#ffffff] w-[65.56vw] mx-auto mt-32 mb-10 rounded-2xl shadow-sm py-12 px-6">
                <h1 className="text-[2rem]">Test fonction dashboard</h1>
                <div className="flex flex-row">
                    <input
                        className="bg-rayonorange w-[40vw] h-[2rem] rounded-2xl text-white text-center item-center p-[0.2rem] "
                        type="file"
                        onChange={handleFileSelection}
                        accept=".pdf"
                        name="fileSelector"
                    ></input>
                    <button
                        onClick={handleFileSubmit}
                    >Upload</button>
                </div>
                <div className="flex flex-row">
                    <input type="text" onChange={handleDelChange} />
                    <button
                        onClick={() => deletePDF(delFile)}
                    >Delete</button>
                </div>
                <div className="flex flex-row">
                    <input type="text" onChange={handleOpenChange}/>
                    <button>Open</button>
                </div>

            </div>
        </>
    )
}
export default DashTest