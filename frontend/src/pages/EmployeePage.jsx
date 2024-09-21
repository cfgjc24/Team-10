import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css";
import CheckInButtons from '../components/CheckInButtons.jsx'
import EmployeeMap from '../components/EmployeeMap';
import { Card, CardBody, Heading, Box } from '@chakra-ui/react'
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

  const clients = [
    { _id: 1, name: "Alice Johnson", status: "manager" },
    { _id: 2, name: "Bob Smith", status: "worker" },
    { _id: 3, name: "Charlie Brown", status: "worker" },
    { _id: 4, name: "Diana Prince", status: "manager" },
    { _id: 5, name: "Ethan Hunt", status: "worker" },
    { _id: 6, name: "Fiona Apple", status: "manager" },
    { _id: 7, name: "George Clooney", status: "worker" },
    { _id: 8, name: "Hannah Montana", status: "worker" },
    { _id: 9, name: "Isaac Newton", status: "manager" },
    { _id: 10, name: "Jack Sparrow", status: "worker" },
  ];

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
        <Box padding={'20px'}>
          <Heading>Current Patients</Heading>
          {clients.map((employee) => (
            <Box key={employee._id} marginBottom={'20px'}>
              <IdCard Employee={employee} />
            </Box>
          ))}
        </Box>
        </div>
        <div className="col middle-side">
          <Calendar className="calendar-shadow" />
        </div>
        <div className="col right-side">
          <CheckInButtons 
            onClockIn={handleClockIn} 
            onClockOut={handleClockOut} 
            isClockIn={isClockIn} 
          />
          <EmployeeMap 
            newLocation={employeeLocation} 
            isClockIn={isClockIn} 
          />
        </div>
      </div>
    </div>
  );
}

export default EmployeePage;
