import { useEffect, useState } from "react";
import AdminViewCard from "../components/AdminViewCard";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import axios from 'axios';

function AdminPage() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/workers');
      setEmployees(response.data.workers);
    } catch (error) {
      console.error('Error fetching Employees:', error);
    }
  };

  return (
    <Flex justify={'center'}>
      <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' maxW={'50vw'} maxH={'50vh'}>
        {employees.map((employee) => (
          <AdminViewCard key={employee._id} Employee={employee} />
        ))}
      </SimpleGrid>
    </Flex>
  );
}

export default AdminPage;