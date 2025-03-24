import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  const toggleNav = () => {
    setExpanded(!expanded);
  };

  const closeNav = () => {
    setExpanded(false);
  };

  // Determine if a nav item is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container">
        {/* Brand/Logo with Link */}
        <Link 
          className="navbar-brand" 
          to="/" 
          onClick={closeNav}
        >
          My React Editor
        </Link>
        
        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNav}
          aria-expanded={expanded}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Navbar Links */}
        <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
                to="/" 
                onClick={closeNav}
                end
              >
                <i className="bi bi-house-door me-1"></i> Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
                to="/ai-automation" 
                onClick={closeNav}
              >
                <i className="bi bi-robot me-1"></i> AI Automation
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
                to="/text-format" 
                onClick={closeNav}
              >
                <i className="bi bi-fonts me-1"></i> Text Format
              </NavLink>
            </li>
          </ul>
          
       
        </div>
      </div>
    </nav>
  );
};

export default Navbar;