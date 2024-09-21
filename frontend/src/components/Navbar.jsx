import { Box, Button } from '@chakra-ui/react'
import React from 'react'

const Navbar = () => {
  return (
    <Box padding={'2vh'}>
        <Button
        size='md'
        height='48px'
        width='200px'
        border='2px'
        borderColor='green.500'
        >
            Signout
        </Button>
    </Box>
  )
}

export default Navbar;