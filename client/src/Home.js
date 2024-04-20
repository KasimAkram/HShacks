import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { errorExplinationMark } from './Icons';
import { customStyles } from './Modules/customStyles';
import Modal from 'react-modal';

const volunteerOptions = [
    "Community Cleanup",
    "Food Bank Assistance",
    "Senior Support",
    "Youth Mentoring",
    "Animal Shelter Help"
];


const Home = ({ selectedVolunteeringOptions, setSelectedVolunteeringOptions }) => {
    const navigate = useNavigate();
    const [statusUI, showStatusUI] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const redirectToHomePage = () => navigate('/');


    const openUI = useCallback((type) => {
        setFadeOut(false);
        if (type === "status") showStatusUI(true)
        return
    }, []);

    const closeUI = useCallback((type) => {
        setFadeOut(true);
        if (type === "status") setTimeout(() => showStatusUI(false), 75);
        return
    }, []);

    useEffect(() => {
        setSelectedVolunteeringOptions(volunteerOptions);
    }, [volunteerOptions]);

    const toggleVolunteerOption = option => {
        const currentIndex = selectedVolunteeringOptions.indexOf(option);
        const newSelectedOptions = [...selectedVolunteeringOptions];
        if (currentIndex === -1) newSelectedOptions.push(option); else newSelectedOptions.splice(currentIndex, 1);
        setSelectedVolunteeringOptions(newSelectedOptions);
    };



    return (
        <>
            <div className="home">
                <Modal isOpen={statusUI} style={customStyles} className={`react-modal ${fadeOut ? 'fadeOut' : ''}`} onRequestClose={() => closeUI("status")} contentLabel="Status Modal" >
                    <div className='statusModail'>
                        <div className="socialModailText">Personalize My Experience</div>
                        <div className="smallSocialModailText">{`Feel free to skip, you currently like ${selectedVolunteeringOptions.length} ${selectedVolunteeringOptions.length === 1 ? "thing" : "things"}`}</div>
                        <div className="centeredSocialMediaDiv">
                            <div className='whiteLineHorizontal' />
                            <div className="volunteer-options">
                                {volunteerOptions.map((option, index) => (
                                    <div key={index} className={`bottomRightUiV3 ${selectedVolunteeringOptions.includes(option) ? '' : 'opacueBG'}`}
                                        onClick={() => toggleVolunteerOption(option)}>
                                        {option}
                                    </div>
                                ))}
                            </div>
                            <div className='whiteLineHorizontal' />
                        </div>
                    </div>
                    <div className="bottom-right-ui-container modalBottomUi">
                        <div className="bottomRightUiV3" onClick={() => { closeUI("status"); }}>Skip</div>
                        <div className="bottomRightUiV3 greenBG" onClick={() => navigate("/search")}>Next</div>
                    </div>
                </Modal>

            </div>
        </>
    );
};

export default Home;