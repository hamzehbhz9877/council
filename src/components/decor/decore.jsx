import React from 'react';
import decor from "../../images/decoration_light.svg"

const Decor = () => {
    return (
        <div className="decor">
            <img className="decor__image" src={decor} alt=""/>
        </div>
    );
};

export default Decor;