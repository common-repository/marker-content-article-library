import React from 'react';

function SearchResultItem({item})
{
    return (
        <div className="searchResultItem" id={item.id}>{item.title}</div>
    );
}

export default SearchResultItem;