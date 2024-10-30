import React from 'react';

function ButtonSecondary({children,type, disabled=false,handleClick=''}) {
    return (
            <button className={ `marker-button ${disabled?'marker-button-secondary-disabled':'marker-button-secondary'}`} type={type}  disabled={disabled}  onClick={handleClick}>
                {children}
            </button>
    );
}

export default ButtonSecondary;