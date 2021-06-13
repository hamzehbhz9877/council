import React from 'react';
import {NavLink} from "react-router-dom";

const Dropdown = () => {
    return (
            <div className="menu__dropdown" id="dropdown">
                <ul>
                    <li>
                        <NavLink to="/adminPanel/profile" className="menu__dropdown-link">
                            <span className="iconify menu__dropdown-icon" data-icon="mdi-account-edit" data-inline="false"/>
                            <span>پروفایل</span>
                        </NavLink>
                    </li>
                    <hr/>
                    <li>
                        <NavLink to="/adminPanel/logout" className="menu__dropdown-link menu__dropdown--exit">
                            <span className="iconify menu__dropdown-icon" data-icon="mdi-power" data-inline="false"/>
                            <span>خروج</span>
                        </NavLink></li>
                </ul>
            </div>
    );
};

export default Dropdown;