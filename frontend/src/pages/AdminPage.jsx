import AdminViewCard from "../components/AdminViewCard"
import { Flex, SimpleGrid } from "@chakra-ui/react"

function AdminPage() {

  return (
    <Flex justify={'center'}>
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' maxW={'50vw'} maxH={'50vh'}>
          <AdminViewCard/>
          <AdminViewCard/>
          <AdminViewCard/>
          <AdminViewCard/>
          <AdminViewCard/>
          <AdminViewCard/>
        </SimpleGrid>
    </Flex>
  )
}

export default AdminPage
