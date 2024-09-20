import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css";

function CheckInButtons() {
    return(
      <div id="buttons">
        <button type="button" class="btn btn-success">Success</button>
        <button type="button" class="btn btn-danger">Report Incident</button>
      </div>
    );
  }
  
export default CheckInButtons;