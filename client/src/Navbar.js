import React, {  } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import searchIcon from './Icons/searchIcon.png';
import './Navbar.css';
import { onlineIcon } from './Icons';

const Navbar = () => {
    const navigate = useNavigate();

    const handleSearchClick = () => navigate('/search');
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