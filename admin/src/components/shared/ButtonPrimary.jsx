import React from "react";

function ButtonPrimary ({children,type, fieldEmpty=false}){
    return(
        <button className={ `marker-button ${fieldEmpty?'marker-button-disabled':'marker-button-primary'}`} type={type}  disabled={fieldEmpty} >
            {children}
        </button>
    )

}

export default ButtonPrimary