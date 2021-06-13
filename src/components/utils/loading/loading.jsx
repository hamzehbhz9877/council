import React from 'react';
import loading from "../../../images/Rolling-1s-200px.svg"

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="loading-bar-infinity">
                <img src={loading} alt="loading"/>
            </div>
        </div>
    );
};

export default Loading;