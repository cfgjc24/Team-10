import React from "react";
import { Card, CardBody, Heading, Text } from '@chakra-ui/react'

const IdCard = () => {
  return (
    <Card w={'20vw'}>
      <CardBody>
        <Heading fontSize={'large'}>Field Worker</Heading>
        <Text>Status</Text>
      </CardBody>
    </Card>
  )
} ;

export default IdCard;