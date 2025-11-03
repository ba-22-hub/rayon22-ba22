import React from "react";

function Steper({ steps, currentStep }) {
    const nbSteps = steps.length;

    return (
        <div className="flex flex-row justify-center items-end mt-8 w-full px-4 lg:px-0 gap-2 lg:gap-4">
            {steps.map((step, index) => (
                <React.Fragment key={index}>
                    <div className="flex flex-col items-center min-w-0 flex-shrink-0 w-20 lg:w-28">
                        {/* Label avec min-height */}
                        <span className="text-xs lg:text-sm text-center font-medium leading-tight min-h-[3rem] flex items-end justify-center mb-2">
                            {step}
                        </span>

                        {currentStep === index + 1 ? (
                            <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 lg:border-l-10 lg:border-r-10 lg:border-b-10 border-l-transparent border-r-transparent border-b-rayonorange mb-1"></div>
                        ) : (
                            <div className="h-[8px] lg:h-[10px] mb-1"></div>
                        )}

                        <div className="flex justify-center items-center w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 border-black bg-white z-10">
                            <div className="bg-rayonorange rounded-full w-8 h-8 lg:w-10 lg:h-10 flex justify-center items-center">
                                <span className="text-black font-bold text-sm lg:text-base">
                                    {index + 1}
                                </span>
                            </div>
                        </div>
                    </div>

                    {index < nbSteps - 1 && (
                        <div className="h-0.5 bg-black flex-1 max-w-[60px] -mx-8 lg:-mx-12 lg:max-w-[120px] mb-6 lg:mb-7"></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    )
}

export default Steper;