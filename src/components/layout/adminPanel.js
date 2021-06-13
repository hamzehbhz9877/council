import React, {useCallback, useState} from 'react';
import PanelSidebar from "../panelsSidebar/panelSidebar";
import Header from "../header/header";
import Decor from "../decor/decore";
import Backdrop from "../utils/backdrop/backdrop";
import Breadcrumbs from "../utils/breadCrubm/breadCrumb";

const AdminPanel = (props) => {


    const [open, setOpen] = useState(false);

    const handleOpen =useCallback (() => {
        setOpen(true)
    },[setOpen]);

    const handleClose = () => {
        setOpen(false)
    };

    return (
        <div className="container council">
            <Decor/>
            <header className="header">
                <Header openSidebar={handleOpen}/>
            </header>
            <main className="main">
                <div className="panel">
                    <PanelSidebar closeSidebar={handleClose} openSidebar={open}/>
                    <div className="main__content w-100">
                        <Breadcrumbs/>
                        {props.children}
                    </div>
                </div>
            </main>
            <Backdrop openSidebar={open} closeSidebar={handleClose}/>
        </div>
    );
};

export default AdminPanel;