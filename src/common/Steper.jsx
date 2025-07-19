
function Steper({ steps, currentStep }) {
    const nbSteps = steps.length;
    const widthline = (3 + 6) + 'rem'

    return (
        <>
            <style>
                {`
                .steper{
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                }
                .step {
                    z-index: 4;
                    justify-content: center;
                    align-items: center;
                    display: flex;
                    flex-direction: column; 
                    width : 6rem ; 
                    margin-left: -1rem;
                    margin-right: -1rem;
                }
                .disque{
                    z-index: 2;
                    background-color :  #FF8200; 
                    border-radius: 50%;
                    width : 3rem ; 
                    height : 3rem;
                    justify-content: center;
                    align-items: center;
                    display: flex;
                    z-index: 2;

                }
                .circle{
                    z-index: 3;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width : 4rem ;
                    height : 4rem ;
                    border-radius: 50%;
                    border: 2px solid black;
                }
            
                .line{
                    margin-top : 4%;
                    width: 9rem; 
                    height: 2px;
                    background-color: black;
                    z-index: 1;
                }
                .show-active{
                    margin-top : -7px; 
                    height: 12px;
                    width : 15px;   ; 
                    margin-bottom: 0.5rem;
                }
                .active .show-active{
                    border: 10px solid transparent;
                    border-bottom-color: #FF8200;
                    margin-top: -10px;
                    margin-bottom: 0.2rem;
                }
                
            `}
            </style>
            <div className="steper">
                {steps.map((step, index) => (
                    <>
                    <div key={index} className={`step ${currentStep === index + 1 ? 'active' : ''} center`}>
                        <span className="step-label"><black>{step}</black></span><br />
                        <div className="show-active"></div>
                        <div className="circle">
                            <div className="disque">
                                <p className="step-number"><black>{index + 1}</black></p>
                            </div>
                        </div>
                    </div>
                    { index < nbSteps - 1 && (<div className="line"></div>)}
                    </>
                ))}
            </div>
        </>
    )
}

export default Steper;