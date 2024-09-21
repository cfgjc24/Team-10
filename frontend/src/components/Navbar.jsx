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

export default Navbar;import React from "react";
import lodestarLogo from "../assets/lodestar-logo.png";
import "../index.css";

function Navbar() {
    return (
        <header>
            <div className="header">
                <img className="logo" src={lodestarLogo} alt="Lodestar logo" />
            </div>
            {/* Use hr for a horizontal line */}
            <hr className="line" />
        </header>
    );
}
export default Navbar;
