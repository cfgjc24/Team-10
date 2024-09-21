import React from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css";

function CheckInButtons({ onClockIn, onClockOut, isClockIn }) {
  const navigate = useNavigate();

   const handleClockIn = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log('Clock in successful:', { latitude, longitude });
        onClockIn({ latitude, longitude });
      }, (error) => {
        console.error("Error getting location:", error);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

  
  };

  const handleClockOut = () => {
    onClockOut();
    navigate("/submitform");
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