import React  from "react";
function Form({children,handleSubmit,customClass=''} ) {

    return (
        <form className={"markerContent-form "+customClass}  onSubmit={handleSubmit}>
            {children}
        </form>
    )
}

export default Form;