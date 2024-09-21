import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css";
import CheckInButtons from '../components/CheckInButtons.jsx'


function EmployeePage() {
    return(
        <div>
            <div id="banner">
                <div className="alert alert-light" role="alert"> 
                    Our impact: {open_case} open cases!
                </div>
            </div>
            <div id="page-container">
                <div className="col left-side">
                    Column
                </div>
                <div className="col right-side">
                    <CheckInButtons></CheckInButtons>
                </div>
            </div>
        </div>
    );
  }
  
export default EmployeePage;