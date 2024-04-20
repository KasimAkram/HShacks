import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Modal from 'react-modal';
import { customStyles } from './Modules/customStyles';

const volunteerOptions = [
    "Community Cleanup",
    "Food Bank Assistance",
    "Senior Support",
    "Youth Mentoring",
    "Animal Shelter Help"
];

const containerStyle = {
    width: '700px',
    height: '800px'
};

const smallContainerStyle = {
    width: '250px',
    height: '250px'
};
const generateEvents = (center) => {
    const categories = [
        "Community Cleanup",
        "Food Bank Assistance",
        "Senior Support",
        "Youth Mentoring",
        "Animal Shelter Help"
    ];

    const names = [
        "Manny's",
        "Jeoffy's",
        "Alice's",
        "Bob's",
        "Cara's",
        "Derek's",
        "Eliza's",
        "Fred's",
        "Gina's",
        "Xi's",
        "Ashwagandha's",
        "HSHacks's"
    ];

    const addDaysToDate = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };

    const today = new Date();

    const events = categories.flatMap(category => {
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomDays = Math.floor(Math.random() * 6) + 1; // Generate 1 to 6 days to ensure it's not today
        const eventDate = addDaysToDate(today, randomDays).toLocaleDateString('en-US', {
            weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
        });

        return {
            name: `${randomName} ${category}`,
            category,
            date: eventDate,
            location: {
                lat: center.lat + (Math.random() * 0.016), // Randomly within ~0.5 miles
                lng: center.lng + (Math.random() * 0.016)
            }
        };
    });

    return events;
};




const Search = ({ selectedVolunteeringOptions, setSelectedVolunteeringOptions }) => {
    const navigate = useNavigate();
    const [currentLocation, setCurrentLocation] = useState(null);
    const [specfiicLocation, setSpecfiicLocation] = useState(null);
    const [detailsUI, showDetailsUI] = useState(false);
    const [statusUI, showStatusUI] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [events, setEvents] = useState([]);
    const [map, setMap] = useState(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyClSmoUtoTchbsocJmVoUSbXfwWHFCoPOo"
    });

    useEffect(() => {
        if (!selectedVolunteeringOptions || !currentLocation) return; // Ensure currentLocation is not null
        const allEvents = generateEvents(currentLocation);
        const filteredEvents = allEvents.filter(event => selectedVolunteeringOptions.includes(event.category));
        const sortedEvents = filteredEvents.sort((a, b) => {
            const distA = Math.hypot(currentLocation.lat - a.location.lat, currentLocation.lng - a.location.lng);
            const distB = Math.hypot(currentLocation.lat - b.location.lat, currentLocation.lng - b.location.lng);
            return distA - distB;
        });
        setEvents(sortedEvents);
    }, [selectedVolunteeringOptions, currentLocation]); // Include currentLocation in the dependency array



    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    setCurrentLocation(pos);
                },
                error => {
                    console.error('Geolocation failed: ', error);
                }
            );
        }
    }, []);

    const onLoad = useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    const openUI = useCallback((type) => {
        setFadeOut(false);
        if (type === "details") showDetailsUI(true)
        if (type === "status") showStatusUI(true)
        return
    }, []);

    const closeUI = useCallback((type) => {
        setFadeOut(true);
        if (type === "status") setTimeout(() => showStatusUI(false), 75);
        if (type === "details") {
            setSpecfiicLocation(null)
            setTimeout(() => showDetailsUI(false), 75);
        }
        return
    }, []);

    const toggleVolunteerOption = option => {
        const currentIndex = selectedVolunteeringOptions.indexOf(option);
        const newSelectedOptions = [...selectedVolunteeringOptions];
        if (currentIndex === -1) newSelectedOptions.push(option); else newSelectedOptions.splice(currentIndex, 1);
        setSelectedVolunteeringOptions(newSelectedOptions);
    };

    if (!selectedVolunteeringOptions || !currentLocation) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    return (
        <div className='centerMainDiv'>
                <Modal isOpen={statusUI} style={customStyles} className={`react-modal ${fadeOut ? 'fadeOut' : ''}`} onRequestClose={() => closeUI("status")} contentLabel="Modal" >
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
                        <div className="bottomRightUiV3 greenBG" onClick={() => closeUI("status")}>Next</div>
                    </div>
                </Modal>
            <div className='searchMainDiv'>
                <div className='searchListStyle'>
                    <h2>Events Near You</h2>
                    <div className="event-list-container">
                        {currentLocation && events.map((event, index) => {
                            const distanceInMiles = Math.hypot(currentLocation.lat - event.location.lat, currentLocation.lng - event.location.lng) * 69;
                            const distance = distanceInMiles < 1 ? distanceInMiles.toFixed(1) : Math.round(distanceInMiles);
                            const distanceText = `${distance} ${distance === 1 ? 'mile' : 'miles'} away`;
                            event["distance"] = distanceText;
                            return (
                                <div key={index} className="event-card" onClick={() => { openUI("details"); setSpecfiicLocation(event); }}>
                                    <div className="event-name">{event?.name}</div>
                                    <div className="event-date">{event?.date}</div>
                                    <div className="event-details">{distanceText}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <Modal isOpen={detailsUI} style={customStyles} className={`react-modal ${fadeOut ? 'fadeOut' : ''}`} onRequestClose={() => closeUI("details")} contentLabel="Status Modal" >
                    <div className='statusModail'>
                        {specfiicLocation ? (
                            <>
                                <div className="socialModailText">{specfiicLocation?.name}</div>
                                <div className="smallSocialModailText">{specfiicLocation?.date}</div>
                                <div className="smallSocialModailText">{specfiicLocation?.distance}</div>

                                {isLoaded && currentLocation && (
                                    <GoogleMap
                                        mapContainerStyle={smallContainerStyle} center={specfiicLocation?.location} zoom={15.25} onLoad={onLoad} onUnmount={onUnmount}>
                                        <Marker key={1} position={specfiicLocation.location} label={specfiicLocation.name} />
                                    </GoogleMap>
                                )}
                                <div className="centeredSocialMediaDiv">
                                </div>
                                <div className="bottom-right-ui-container modalBottomUi">
                                    <div className="bottomRightUiV3" onClick={() => { closeUI("details"); }}>Register</div>
                                    <div className="bottomRightUiV3 greenBG" onClick={() => closeUI("details")}>Close</div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='biggerGap'>
                                    <div className="socialModailText">Fetching Data...</div>
                                    <div className="searchLoadingInsideDiv infinateLoadingAnimation">
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </Modal>
                {isLoaded && currentLocation && (
                    <GoogleMap
                        mapContainerStyle={containerStyle} center={currentLocation} zoom={15.25} onLoad={onLoad} onUnmount={onUnmount}>
                        {events.map((event, index) => (
                            <Marker key={index} position={event.location} label={event.name} />
                        ))}
                    </GoogleMap>
                )}
            </div>
        </div>
    );
}

export default Search;
