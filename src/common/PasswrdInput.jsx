import { useState } from "react";

function PasswrdInput({
    labelClassName = "",
    className,
    inputText,
    name,
    value,
    onChange,
    isStarred = false,
}) {
    const [showPassword, setShowPassword] = useState(false);


    return (
        <div className="w-full">
            <label className={"text-rayonblue " + labelClassName}>
                {inputText}
                {isStarred && <span className="text-red"> *</span>}
            </label>

            <div className="relative mt-1">
                <input
                    className={className}
                    type={showPassword ? 'text' : 'password'}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={isStarred}
                />


                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                    {showPassword ? (
                        /* œil barré */
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF8200" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5.52 0-10-4-10-8 0-1.72.72-3.34 2.06-4.72M6.1 6.1A10.94 10.94 0 0 1 12 4c5.52 0 10 4 10 8 0 1.76-.76 3.46-2.22 4.88M1 1l22 22" />
                        </svg>
                    ) : (
                        /* œil */
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF8200" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    )}
                </button>

            </div>
        </div>
    );
}

export default PasswrdInput;
