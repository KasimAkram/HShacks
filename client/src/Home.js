import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { arrowTopRight, elderlyLady } from './Icons';

const volunteerOptions = [
    "Community Cleanup",
    "Food Bank Assistance",
    "Senior Support",
    "Youth Mentoring",
    "Animal Shelter Help"
];


const Home = ({ setSelectedVolunteeringOptions }) => {
    const navigate = useNavigate();
    useEffect(() => {
        setSelectedVolunteeringOptions(volunteerOptions);
    }, [volunteerOptions]);

    return (
        <>
            <div className="home">
                <div className="akrRShopContainer">
                    <div className="akrRShopTop left">
                        <div className="akrTopText">Enlistor</div>
                        <div className="akrTopMidText">The easiest way to find volunteer work!</div>
                        {(true &&
                            <>
                                <div className="akrRBLXShopButton" onClick={() => navigate("search")} >
                                Search Now!
                                <img src={arrowTopRight} alt="" className="socialIconV2Right"></img>
                            </div>
                            </>
                        )}
                     
                    </div>
                    <div className="akrRShopTop right">
                        <img src={elderlyLady} className="akrRShopImg" alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;