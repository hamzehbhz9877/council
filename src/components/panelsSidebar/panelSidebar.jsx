import React, {useEffect, useState} from 'react';
import {AdminItems} from "./navItems/adminItems";
import img from "../../images/users/unnamed.png"
import {NavLink, useRouteMatch} from "react-router-dom"
import {useSelector} from "react-redux";

const PanelSidebar = ({closeSidebar,openSidebar}) => {

    const {username} = useSelector(state => state.loginReducer);
    const {url} = useRouteMatch();
    const [transform, setTransform] = useState(0)

    useEffect(() => {
        const sidebar = document.getElementById("sidebar")
        sidebar.addEventListener("scroll", handleScroll);
        return () => {
            sidebar.removeEventListener("scroll", handleScroll);
        }
    }, [])

    const handleScroll = (e) => {
        const scroll = e.target.scrollTop;
        setTransform(scroll)
    }


    return (
        <>
            <div className={openSidebar ? "sidebar--open sidebar" : "sidebar"} id="sidebar">
                <div className="sidebar__top py-4 text-center" style={{opacity: 1 - (transform / 100)}}>
                    <div>
                        <img className="sidebar__img" src={img} alt=""/>
                    </div>
                    <div className="mt-4">
                        <h5 className="sidebar__user-name">{username}</h5>
                        <p className="sidebar__user-level">مدیر</p>
                    </div>
                </div>
                <div className="sidebar__bottom">
                    <ul>
                        {AdminItems.map((item, index) =>
                            <li className="sidebar-item" key={index} onClick={closeSidebar}>
                                <NavLink to={url + item.to} className="sidebar__link"
                                         activeClassName="sidebar-link--active"
                                         isActive={(match, location) => {
                                             return location.pathname.startsWith(`/adminPanel${item.to}`);
                                         }}
                                         exact>
                                    <span className="iconify sidebar__icon" data-icon={`mdi-${item.mdi}`}
                                          data-inline="false"/>
                                    <span className="sidebar__text">{item.text}</span>
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default PanelSidebar;