import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css";
import CheckInButtons from '../components/CheckInButtons.jsx'

function EmployeePage() {
    return(
        <div id="page-container">
            <div class="col left-side">
                Column
            </div>
            <div class="col right-side">
                <CheckInButtons></CheckInButtons>
            </div>
        </div>
    );
  }
  
export default EmployeePage;