import React ,{ useState } from "react";

function FormInput(props) {
    const {
        label,type='text', ...rest
    } = props;

    return (
        <div className="FormInput">
            <label>{label}</label>
            <input
                type={type}
                {...rest}
            />
        </div>
    )
}
export default FormInput;