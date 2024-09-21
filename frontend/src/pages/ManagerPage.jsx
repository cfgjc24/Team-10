import React, { act } from 'react';
import WorkerMap from '../components/WorkerMap';
import IdCard from '../components/IdCard';
import { Box, Heading, VStack } from '@chakra-ui/react'

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

  return (
    <Box>
        <div id="page-container">
            <div className="manager-left-side">
                <VStack>
                    <Heading>
                        Active
                    </Heading>
                    {/* {activeWorkers.map((activeWorker) => ( */}
                        <IdCard />
                    {/* ))} */}

                    <Heading>
                        Inactive
                    </Heading>

                    {/* {inactiveWorkers.map((inactiveWorker) => ( */}
                        <IdCard />
                    {/* ))} */}
                </VStack>
            </div>
            <div className="manager-right-side">
                <WorkerMap></WorkerMap>
            </div>
        </div>
    </Box>
  )
};

export default ManagerPage;