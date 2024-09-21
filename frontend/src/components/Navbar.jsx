import React from "react";
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
