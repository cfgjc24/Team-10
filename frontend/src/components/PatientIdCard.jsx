import React from "react";
import { Card, CardBody, Heading, Text } from '@chakra-ui/react'

const PatientIdCard = (props) => {
  return (
    <Card w={'20vw'}>
      <CardBody>
        <Heading fontSize={'large'}>{props.name}</Heading>
        <Text>Status</Text>
      </CardBody>
    </Card>
  )
} ;

export default PatientIdCard;