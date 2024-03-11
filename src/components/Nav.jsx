import React from "react";
import { Link } from "react-router-dom";

const Nav = () =>{
    return (
        <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/topics">Topics</Link>
        </nav>
    )
}

export default Nav;