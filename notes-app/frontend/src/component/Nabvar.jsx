import React from "react";
import "../App.css";

const Navbar = ({ toggleVisibility, isVisible }) => {
    return (
        <nav className="navbar">
            <h1>Notes App</h1>
            <ul className="nav-links">
                <li onClick={() => { window.location.reload()}}>Home</li>
                <li onClick={toggleVisibility} style={{textDecoration: isVisible && "wavy underline"}}>Create Note</li>
            </ul>
        </nav>
    );
};

export default Navbar;  