import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css";
import CheckInButtons from '../components/CheckInButtons.jsx'
import WorkerMap from '../components/WorkerMap.jsx';
import { Card, CardBody, Heading } from '@chakra-ui/react'
import Calendar from '../components/Calendar.jsx';
import IdCard from '../components/IdCard.jsx';

function EmployeePage() {
  const [openCaseCount, setOpenCaseCount] = useState(100);
  const [employeeLocation, setEmployeeLocation] = useState(null);
  const [isClockIn, setIsClockIn] = useState(false);

  const handleClockIn = (location) => {
    setEmployeeLocation(location);
    setIsClockIn(true);
  };

  const handleClockOut = () => {
    setEmployeeLocation(null);
    setIsClockIn(false);
  };

  return (
    <div>
      <div id="banner">
        <Card>
          <CardBody>
            <Heading className="text-center custom-font">Our impact: {openCaseCount} open cases!</Heading>
          </CardBody>
        </Card>
      </div>
      <div id="page-container">
        <div className="col left-side">
          <Heading>Current Patients</Heading>
          <IdCard />
        </div>
        <div className="col middle-side">
          <Calendar className="calendar-shadow" />
        </div>
        <div className="col right-side">
          <CheckInButtons onClockIn={handleClockIn} onClockOut={handleClockOut} />
          <WorkerMap newLocation={employeeLocation} isClockIn={isClockIn} />
        </div>
      </div>
    </div>
  );
}

export default EmployeePage;