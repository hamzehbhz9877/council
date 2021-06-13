import React, {useState} from 'react';
import img from "../../images/users/unnamed.png"
import Dropdown from "../utils/dropdown/dropdown";
import {useSelector} from "react-redux";

const Header = ({openSidebar}) => {


    const {username} = useSelector(state => state.loginReducer);


    const openMenu = () => {
        document.querySelector("#dropdown").classList.toggle("menu__dropdown--open");
    };

    return (
        <div className="container d-flex justify-content-between align-items-center align-items-center h-100">
            <div className="hamburger-menu">
                <button onClick={openSidebar}>
                      <span onClick={openSidebar} className="iconify mdi-hamburger-menu pointer" data-icon="mdi-hamburger-menu"
                            data-inline="false"/>
                </button>
            </div>
            <div className="header__top menu d-flex">
                <button className="text-white menu__btn" onClick={openMenu}>
                    <img className="header__img" src={img} alt=""/>
                    <span className="header__user-name">{username}</span>
                    <i className="iconify" data-icon="mdi-chevron-down" data-inline="false"/>
                </button>
                <Dropdown/>
            </div>
        </div>
    );
};

export default React.memo(Header);