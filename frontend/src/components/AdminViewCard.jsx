import { Card, CardBody, Image, Stack, Heading, 
    Text, Divider, CardFooter, Button,  
    useToast, useDisclosure} from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalHeader,
    ModalContent, ModalCloseButton,
    ModalBody, FormControl, FormLabel,
    Input, ModalFooter, Select
 } from '@chakra-ui/react';
import React from "react";

const AdminViewCard = ({ Employee }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const toast = useToast();

    // const handleEditEmployee = async (EmployeeId, updatedEmployee) => {
    //     const {success, message} = await editEmployee(EmployeeId, updatedEmployee);
    //     if(!success) {
    //         toast({
    //             title:"Error",
    //             description: message,
    //             status:"error",
    //             isClosable:true,
    //           });
    //     }
    //     else {
    //         toast({
    //             title:"Success",
    //             description: message,
    //             status:"success",
    //             isClosable:true,
    //           });
    //     };
    //     onClose();
    // };

    // const handleDeleteEmployee = async (EmployeeId) => {
    //     const {success, message} = await deleteEmployee(EmployeeId);
    //     if(!success) {
    //         toast({
    //             title:"Error",
    //             description: message,
    //             status:"error",
    //             isClosable:true,
    //           });
    //     }
    //     else {
    //         toast({
    //             title:"Success",
    //             description: message,
    //             status:"success",
    //             isClosable:true,
    //           });
    //     }
    // };

  return (
    <Card maxW='sm'>
        <CardBody>
            <Stack mt='6' spacing='3'>
                <Heading size='md'>Employee Name</Heading>
                <Text color='blue.600' fontSize='2xl'>
                    Current Employment Status
                </Text>
            </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
            <>
            <Button onClick={onOpen} variant='solid' colorScheme='blue'> Edit </Button>
  
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Edit Employee</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input placeholder='Name'/>
                        {/* <Input ref={initialRef} placeholder='Name' value={updateEmployee.name} 
                        onChange={(e) => setUpdateEmployee({ ...updateEmployee, name: e.target.value })}/> */}
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Current Position</FormLabel>
                        <Select placeholder='Select option'>
                            <option value='Manager'>Manager</option>
                            <option value='Provider'>Provider</option>
                        </Select>
                        {/* <Input placeholder='Price' value={updateEmployee.price}
                        onChange={(e) => setUpdateEmployee({ ...updateEmployee, price: e.target.value })}/> */}
                    </FormControl>

                </ModalBody>

                <ModalFooter>
                    <Button onClick={() => handleEditEmployee(Employee._id, updateEmployee)} colorScheme='blue' mr={3}>
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
  )
};

export default AdminViewCard;