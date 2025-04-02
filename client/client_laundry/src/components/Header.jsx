import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../../server/src/Authentication/Authentication.jsx";
import "./Header.css";

const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="logo">
        <h1>LaundryPro</h1>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>

        {isLoggedIn ? (
          <>
            <Link to="/chatbot" className="chatbot-btn">Chatbot</Link>
            <button onClick={logout} className="logout-btn">Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
