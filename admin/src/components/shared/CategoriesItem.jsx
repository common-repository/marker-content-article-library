import React from 'react';

function CategoriesItem({category}) {
    return (
        <div className="articleCategory">{category.name}</div>
    );
}

export default CategoriesItem;