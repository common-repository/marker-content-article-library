import React from 'react';
import ReactLoading from 'react-loading';

function Preloader({ type, color }) {
    return (
        <ReactLoading className={'preloader'} type={type} color={color} height={''} width={'10%'} />
    );
}

export default Preloader;