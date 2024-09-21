import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  GridItem, 
  Heading, 
  VStack, 
  Flex,
  useColorModeValue
} from '@chakra-ui/react';
import CheckInButtons from '../components/CheckInButtons';
import EmployeeMap from '../components/EmployeeMap';
import Calendar from '../components/Calendar';
import IdCard from '../components/IdCard';

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

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');

  return (
    <Box bg={bgColor} minHeight="100vh">
      <Container maxW="container.xl" py={8}>
        <Box 
          bg={cardBgColor} 
          p={4} 
          borderRadius="lg" 
          boxShadow="md" 
          mb={8}
        >
          <Heading textAlign="center" size="xl" fontWeight="extrabold">
            Our impact: {openCaseCount} open cases!
          </Heading>
        </Box>

        <Grid templateColumns="repeat(3, 1fr)" gap={8}>
          <GridItem colSpan={1}>
            <VStack spacing={4} align="stretch">
              <Heading size="lg" mb={2}>Current Patients</Heading>
              <Box 
                maxHeight="calc(100vh - 250px)" 
                overflowY="auto" 
                pr={2}
                css={{
                  '&::-webkit-scrollbar': {
                    width: '4px',
                  },
                  '&::-webkit-scrollbar-track': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'gray.300',
                    borderRadius: '24px',
                  },
                }}
              >
                {clients.map((employee) => (
                  <Box key={employee._id} mb={4}>
                    <IdCard Employee={employee} />
                  </Box>
                ))}
              </Box>
            </VStack>
          </GridItem>

          <GridItem colSpan={1}>
            <Box 
              bg={cardBgColor} 
              p={4} 
              borderRadius="lg" 
              boxShadow="md"
            >
              <Calendar />
            </Box>
          </GridItem>

          <GridItem colSpan={1}>
            <VStack spacing={8}>
              <Box 
                w="100%" 
                bg={cardBgColor} 
                p={4} 
                borderRadius="lg" 
                boxShadow="md"
              >
                <CheckInButtons
                  onClockIn={handleClockIn}
                  onClockOut={handleClockOut}
                  isClockIn={isClockIn}
                />
              </Box>
              <Box 
                w="100%" 
                bg={cardBgColor} 
                p={4} 
                borderRadius="lg" 
                boxShadow="md"
              >
                <EmployeeMap
                  newLocation={employeeLocation}
                  isClockIn={isClockIn}
                />
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}

export default EmployeePage;