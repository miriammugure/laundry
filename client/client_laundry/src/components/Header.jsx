import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <h1>LaundryPro</h1>
            </div>
            <nav className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/services">Services</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/login">Login</Link>
               
            </nav>
        </header>
    );
};

export default Header;
