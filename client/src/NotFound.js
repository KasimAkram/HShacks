import React from 'react';
import { useNavigate } from 'react-router-dom';
import { errorExplinationMark } from './Icons';

const NotFound = () => {
    const navigate = useNavigate();
    const redirectToHomePage = () => navigate('/');

    return (
        <>
            <div className="backdrop"></div>
            <div className="rateLimitPopup">
                <img src={errorExplinationMark} onClick={redirectToHomePage} alt="" />
                <div className="ratelimit-content">
                        404: This page doesn't exist or was moved
                    <div className={`goBackPopup`} onClick={redirectToHomePage}>Home</div>
                </div>
            </div>
        </>
    );
};

export default NotFound;