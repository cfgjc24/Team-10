import { useEffect, useState } from "react";
import AdminViewCard from "../components/AdminViewCard";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import axios from 'axios';

function AdminPage() {
  // const [employees, setEmployees] = useState([]);

  // useEffect(() => {
  //   fetchEmployees();
  // }, []);

  // const fetchEmployees = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/workers');
  //     setEmployees(response.data.workers);
  //   } catch (error) {
  //     console.error('Error fetching Employees:', error);
  //   }
  // };

  const mockEmployees = [
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
    <Flex justify={'center'}>
      <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' maxW={'50vw'} maxH={'50vh'}>
        {mockEmployees.map((employee) => (
          <AdminViewCard key={employee._id} Employee={employee} />
        ))}
      </SimpleGrid>
    </Flex>
  );
}

export default AdminPage;