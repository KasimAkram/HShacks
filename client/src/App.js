import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './NotFound';
import Home from './Home';
import Navbar from './Navbar';
import Search from './Search';



import Modal from 'react-modal';
import './App.css'
Modal.setAppElement('#root');

function App() {
  const [selectedVolunteeringOptions, setSelectedVolunteeringOptions] = useState([
    "Community Cleanup",
    "Food Bank Assistance",
    "Senior Support",
    "Youth Mentoring",
    "Animal Shelter Help"
  ]);

  return (
    <Router>
      <div>
        <Navbar
        />
        <Routes>
          <Route path="/" element={<Home selectedVolunteeringOptions={selectedVolunteeringOptions} setSelectedVolunteeringOptions={setSelectedVolunteeringOptions} />} />
          <Route
            path="/search"
            element={<Search selectedVolunteeringOptions={selectedVolunteeringOptions} setSelectedVolunteeringOptions={setSelectedVolunteeringOptions} />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;