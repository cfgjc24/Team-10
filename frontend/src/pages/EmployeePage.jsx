import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css";
import CheckInButtons from '../components/CheckInButtons.jsx'
import Navbar from '../components/Navbar.jsx';
import IdCard from '../components/IdCard.jsx';


function EmployeePage() {
    const [openCaseCount, setOpenCaseCount] = useState(100); // example value
    return(
        <div>
            <Navbar></Navbar>
            <div id="banner">
                <div className="alert alert-light" role="alert"> 
                    Our impact: {openCaseCount} open cases!
                </div>
            </div>
            <div id="page-container">
                <div className="col left-side">
                    <h1>Current Patients</h1>
                    <IdCard></IdCard>
                </div>
                <div className="col right-side">
                    <CheckInButtons></CheckInButtons>
                </div>
            </div>
        </div>
    );
  }
  
export default EmployeePage;