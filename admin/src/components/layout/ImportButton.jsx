import React, {useContext} from 'react';
import PurchaseContext from "../../context/PurchaseContext";

function ImportButton({id,impotable,setIsImport}) {
    const {importArticle} = useContext(PurchaseContext)
    return (
        <>{impotable ?
            <span className={'articleInCart'}> Imported </span>
            :
            <button
                className={`marker-button marker-button-primary`}
                onClick={() => {
                    importArticle(id)
                    setIsImport(true)
                }}>
                Import to Posts
            </button>
        }
        </>
    );
}

export default ImportButton;