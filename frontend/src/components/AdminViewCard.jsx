import { Card, CardBody, CardFooter, CardHeader, Heading, Text, Button } from '@chakra-ui/react'

const AdminViewCard = () => {
  return (
        <Card>
            <CardHeader>
            <Heading size='md'> Employee </Heading>
            </CardHeader>
            <CardBody>
            <Text>Current employee status</Text>
            </CardBody>
            <CardFooter>
            <Button>Edit</Button>
            </CardFooter>
        </Card>
  )
};

export default AdminViewCard;
