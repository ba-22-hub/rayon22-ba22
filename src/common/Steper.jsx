
function Steper({ steps, currentStep }) {
    const nbSteps = steps.length;

    return (
        <>
            <div className="flex flex-row justify-center items-center mt-2% w-[100%]">
                {steps.map((step, index) => (
                    <>
                    <div key={index} className={`z-[4] justify-center items-center flex flex-col w-24 -ml-5 -mr-5`}>
                        <span className="step-label"><black>{step}</black></span><br />
                        <div className={`-mt-[7px] h-4 w-[15px] mb-2 ${currentStep === index + 1 ? 'border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-rayonorange -mt-[10px] mb-0.5' : ''}`}></div>
                        <div className="z-[3] flex justify-center items-center w-14 h-14 rounded-full border-2 border-black">
                            <div className="z-[2] bg-rayonorange rounded-full w-10 h-10 justify-center items-center flex">
                                <p className="step-number"><black>{index + 1}</black></p>
                            </div>
                        </div>
                    </div>
                    { index < nbSteps - 1 && (<div className="mt-[4.3%] w-40 h-0.5 bg-black z-[1]"></div>)}
                    </>
                ))}
            </div>
        </>
    )
}

export default Steper;