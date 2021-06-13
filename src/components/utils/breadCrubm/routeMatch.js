import React from 'react';
import {useRouteMatch} from "react-router-dom";

const RouteMatch = (path) => {
    const uu = useRouteMatch(`/adminPanel${path}`)
    if (uu !== null)
        return uu.params.id

};

export default RouteMatch;