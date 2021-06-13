import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import FixLink from "./council";
import Notification from "../components/utils/alert/alert";
import {useSelector} from "react-redux";
import Loading from "../components/utils/loading/loading";

function App() {

    const state = useSelector(state => state.loadingReducer);

    const baseUrl=document.getElementsByTagName("base")[0].getAttribute("href");

    return (
        <Router basename={baseUrl}>
            <FixLink/>
            <Notification/>
            {state && <Loading/>}
        </Router>
    );
}

export default App;
