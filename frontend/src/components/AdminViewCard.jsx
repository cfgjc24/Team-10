import { Card, CardBody, Stack, Heading, Text, Divider, CardFooter, Button, useToast, useDisclosure } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalHeader, ModalContent, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Select } from '@chakra-ui/react';
import React from "react";

const AdminViewCard = ({ Employee }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleEditEmployee = async (EmployeeId, updatedEmployee) => {
    // Implementation of edit logic...
  };

  const handleDeleteEmployee = async (EmployeeId) => {
    // Implementation of delete logic...
  };

  return (
    <Card maxW='sm'>
      <CardBody>
        <Stack mt='6' spacing='3'>
          <Heading size='md'>{Employee.name}</Heading>
          <Text color='blue.600' fontSize='2xl'>
            {Employee.status} {/* Assuming 'status' is a field in Employee */}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <>
          <Button onClick={onOpen} variant='solid' colorScheme='blue'> Edit </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Employee</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input placeholder='Name' defaultValue={Employee.name} />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Current Position</FormLabel>
                  <Select defaultValue={Employee.status}>
                    <option value='Manager'>Manager</option>
                    <option value='Provider'>Provider</option>
                  </Select>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button onClick={() => handleEditEmployee(Employee._id, { name: Employee.name, status: Employee.status })} colorScheme='blue' mr={3}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
        <Button onClick={() => handleDeleteEmployee(Employee._id)} variant='ghost' colorScheme='red'>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminViewCard;