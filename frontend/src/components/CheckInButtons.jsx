import React from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css";

function CheckInButtons() {
    const navigate = useNavigate();
    const toForm = () => navigate("/submitform");
    return(
      <div id="buttons">
        <button type="button" className="btn btn-success btn-list-item">Clock In</button>
        <button type="button" className="btn btn-primary btn-list-item">Clock Out</button>
        <button type="button" className="btn btn-danger btn-list-item" onClick={toForm}>Report Incident</button>
      </div>
    );
  }
  
export default CheckInButtons;