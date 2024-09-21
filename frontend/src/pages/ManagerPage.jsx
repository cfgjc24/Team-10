import React from "react";
import WorkerMap from '../components/WorkerMap';
import IdCard from '../components/IdCard';
import { Box, Heading, VStack } from '@chakra-ui/react';

const ManagerPage = () => {
    // function to fetch the Workers currently in the field
    // const getActiveWorkers = async () => {
    //     const res = await fetch("/workers");
    //     const data = await res.json();
    //     const activeWorkers = data.data;
    //     return activeWorkers.filter(Worker => Worker.status == 'active');
    // };

    // // function to fetch the Workers NOT currently in the field
    // const getInactiveWorkers = async () => {
    //     const res = await fetch("");
    //     const data = await res.json();
    //     const inactiveWorkers = data.data;
    //     return inactiveWorkers.filter(Worker => Worker.status == 'inactive');
    // };

    // const activeWorkers = getActiveWorkers();
    // const inactiveWorkers = getInactiveWorkers();

    const activeWorkers = [
        { _id: 1, name: "Alice Johnson"},
        { _id: 2, name: "Bob Smith"},
        { _id: 3, name: "Charlie Brown"},
        { _id: 4, name: "Diana Prince"},
    ];

    const inactiveWorkers = [
        { _id: 5, name: "Ethan Hunt"},
        { _id: 6, name: "Fiona Apple"},
        { _id: 7, name: "Maya Boyle"},
    ];

    return (
        <Box>
            <div id="page-container">
                <div className="manager-left-side">
                    <VStack spacing={4}>
                        <Heading size="lg">Active</Heading>
                        {activeWorkers.map((employee) => (
                            <IdCard key={employee._id} Employee={employee} />
                        ))}

                        <Heading size="lg">Inactive</Heading>
                        {inactiveWorkers.map((employee) => (
                            <IdCard key={employee._id} Employee={employee} />
                        ))}
                    </VStack>
                </div>
                <div className="manager-right-side">
                    <WorkerMap />
                </div>
            </div>
        </Box>
    );
};

export default ManagerPage;
