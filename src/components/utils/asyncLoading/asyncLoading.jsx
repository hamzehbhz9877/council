import React from 'react';
import loading from "../../../images/Rolling-1s-200px.svg"
const AsyncLoading = () => {
    return (
        <div className="lazy-loading">
            <img src={loading} alt=""/>
        </div>
    );
};

export default AsyncLoading;