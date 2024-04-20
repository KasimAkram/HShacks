import React, { useCallback, useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from './Icons/logo.png';
import notificationBell from './Icons/notificationBell.png';
import searchIcon from './Icons/searchIcon.png';
import './Navbar.css';
import Modal from 'react-modal';
import { errorExplinationMark, onlineIcon } from './Icons';
import { customStyles } from './Modules/customStyles';

const Navbar = () => {
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);
    const [gatheredNotifications, setGatheredNotifications] = useState(false);
    const navigate = useNavigate();

    const handleSearchClick = () => navigate('/search');
    


    const openUI = async (type) => {
        setFadeOut(false);
        if (type === "notification") setIsNotificationVisible(true)
        return;
    }

    const closeUI = async (type) => {
        setFadeOut(true);
        if (type === "notification") setTimeout(() => setIsNotificationVisible(false), 75);
        return;
    }



    return (
        <nav className="navbar">
            <Link to="/" className="navbarLogoLink">
            <img className="navbarLogo" src={onlineIcon} alt="Akr" />
            </Link>
            <div className="navbar-links">
                {true ? (
                    <div className="centeredContainer">
                        <img className="notificationBellCSS" alt="" src={searchIcon} onClick={handleSearchClick} />
                    </div>
                ) : (
                    <NavLink to="/login" className="forceWhiteLink navbarLoginButton">Sign in</NavLink>
                )}
            </div>
        </nav>
    );
};

export default Navbar;