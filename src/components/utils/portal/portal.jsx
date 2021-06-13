import React from "react";
import ReactDOM from "react-dom";


const PortalWrapper = ({component, children}) => {

    return ReactDOM.createPortal(children, component);

}

export default PortalWrapper