import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css";
import CheckInButtons from '../components/CheckInButtons.jsx'
import Navbar from '../components/Navbar.jsx';
import IdCard from '../components/IdCard.jsx';
import { Card, CardHeader, CardBody, CardFooter, Heading } from '@chakra-ui/react'
import Calendar from '../components/Calendar.jsx';

function EmployeePage() {
    const [openCaseCount, setOpenCaseCount] = useState(100); // example value
    return(
        <div>
            <div id="banner">
                {/* <div className="text-center alert alert-light custom-font" role="alert"> 
                    he
                </div> */}
                <Card>
                    <CardBody>
                        <Heading className="text-center custom-font">Our impact: {openCaseCount} open cases!</Heading>
                    </CardBody> 
                </Card>
            </div>
            <div id="page-container">
                <div className="col left-side">
                    <Heading>Current Patients</Heading>
                    <IdCard></IdCard>
                </div>
                <div className="col middle-side">
                    <Calendar className="calendar-shadow"></Calendar>
                </div>
                <div className="col right-side">
                    <CheckInButtons></CheckInButtons>
                </div>
            </div>

        </div>
    );
}
  
export default EmployeePage;