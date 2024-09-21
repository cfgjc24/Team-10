import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import lodestarLogo from "../assets/lodestar-logo.png";
import "../index.css";

function Navbar() {
    return (
        <header>
            <div className="header">
                <img className="logo" src={lodestarLogo} alt="Lodestar logo" />
                <Button
                    size='md'
                    height='48px'
                    width='200px'
                    border='2px'
                    borderColor='green.500'
                    margin={'10px'}
                    >
                        Signout
                </Button>
            </div>
        </header>
    );
}
export default Navbar;
