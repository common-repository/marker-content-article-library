import React from 'react';
import Highlighter from "react-highlight-words";

const FindMach = ({searchInputValue, title}) => {
    return (<Highlighter
        highlightClassName="search-mach"
        searchWords={searchInputValue.split(' ')}
        autoEscape={true}
        textToHighlight={title}
    />)
}

export default FindMach;