import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css";

function CheckInButtons({ onClockIn, onClockOut, isClockIn }) {
  const navigate = useNavigate();

  const handleClockIn = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.post('http://localhost:8000/clock-in', {
            latitude,
            longitude,
            user_id: 1 // Replace with actual user ID from your authentication system
          });
          console.log('Clock in successful:', response.data);
          onClockIn({ id: response.data.id, latitude, longitude });
        } catch (error) {
          console.error('Error clocking in:', error);
        }
      }, (error) => {
        console.error("Error getting location:", error);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleClockOut = async () => {
    try {
      onClockOut();
      navigate("/submitform");
    } catch (error) {
      console.error('Error clocking out:', error);
    }
  };

  return (
    <div id="buttons">
      {!isClockIn ? (
        <button type="button" className="btn btn-success btn-list-item" onClick={handleClockIn}>Clock In</button>
      ) : (
        <button type="button" className="btn btn-primary btn-list-item" onClick={handleClockOut}>Clock Out</button>
      )}
      <button type="button" className="btn btn-danger btn-list-item">Emergency</button>
    </div>
  );
}

export default CheckInButtons;