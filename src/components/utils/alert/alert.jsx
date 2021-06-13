import React from 'react';
import TimeoutAlert from "./timeout";
import {useSelector} from "react-redux";
import PortalWrapper from "../portal/portal";

const alert =document.getElementById("alert-wrapper")

const Notification = () => {
    const state = useSelector(state => state.alertReducer);
    return (
        <PortalWrapper component={alert}>
            <div className="Alert">
                {
                    state.map((note) => {
                        return <TimeoutAlert key={note.id} {...note} />
                    })
                }
            </div>
        </PortalWrapper>
    );
};

export default Notification;