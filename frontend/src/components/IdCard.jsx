import React from "react";
import { Card, CardBody, Heading, Text } from '@chakra-ui/react'

const IdCard = ({ Employee }) => {
  return (
    <Card w={'20vw'}>
      <CardBody>
        <Heading fontSize={'large'}>{Employee.name}</Heading>
      </CardBody>
    </Card>
  )
} ;

export default IdCard;