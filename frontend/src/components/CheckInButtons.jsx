import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css";

function CheckInButtons() {
    return(
      <div id="buttons">
        <button type="button" class="btn btn-success btn-list-item">Clock In</button>
        <button type="button" class="btn btn-primary btn-list-item">Clock Out</button>
        <button type="button" class="btn btn-danger btn-list-item">Report Incident</button>
      </div>
    );
  }
  
export default CheckInButtons;