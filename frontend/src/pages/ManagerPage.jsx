import React, { act } from 'react';
import EmployeeMap from '../components/EmployeeMap';
import IdCard from '../components/IdCard';
import { Box, Heading, VStack } from '@chakra-ui/react'
import Navbar from '../components/Navbar';

const ManagerPage = () => {

    // // function to fetch the employees currently in the field
    // const getActiveEmployees = async () => {
    //     const res = await fetch("");
    //     const data = await res.json();
    //     const activeEmployees = data.data;
    //     return activeEmployees.filter(employee => employee.status == 'active');
    // };

    // // function to fetch the employees NOT currently in the field
    // const getInactiveEmployees = async () => {
    //     const res = await fetch("");
    //     const data = await res.json();
    //     const inactiveEmployees = data.data;
    //     return inactiveEmployees.filter(employee => employee.status == 'inactive');
    // };

    // const activeEmployees = getActiveEmployees();
    // const inactiveEmployees = getInactiveEmployees();

  return (
    <Box>
    <div id="page-container">
        <div className="manager-left-side">
            <VStack>
                <Heading>
                    Active
                </Heading>
                {/* {activeEmployees.map((activeEmployee) => ( */}
                    <IdCard />
                {/* ))} */}

                <Heading>
                    Inactive
                </Heading>

                {/* {inactiveEmployees.map((inactiveEmployee) => ( */}
                    <IdCard />
                {/* ))} */}
            </VStack>
        </div>
        <div className="manager-right-side">
            <EmployeeMap></EmployeeMap>
        </div>
    </div>
    </Box>
  )
}


export default ManagerPage;