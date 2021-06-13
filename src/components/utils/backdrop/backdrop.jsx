import React from 'react';
import PortalWrapper from "../portal/portal";

const backdrop = document.getElementById('backdrop-wrapper');

const Backdrop = ({openSidebar,closeSidebar}) => {
    return (
        <PortalWrapper component={backdrop}>
            <div className={openSidebar ? "backdrop open" : "backdrop"} onClick={closeSidebar}/>
        </PortalWrapper>
    );
};

export default Backdrop;