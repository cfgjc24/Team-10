import React, { act } from 'react';
import EmployeeMap from '../components/EmployeeMap';
import IdCard from '../components/IdCard';
import { Heading, VStack } from '@chakra-ui/react'

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
    <div id="page-container">
        <div class="manager-left-side">
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
        <div class="manager-right-side">
            <EmployeeMap></EmployeeMap>
        </div>
    </div>
  )
}


export default ManagerPage;