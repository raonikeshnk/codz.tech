import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { navItems } from "lib/data/navItems";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header-transparent mt-4">
      <nav className="navbar navbar-expand-lg text-center">
        <div className="container title-font">
          <Link to="/" className="navbar-brand">
            CodzTech
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <i className="fi-xwluxl-three-bars-wide"></i>
            </span>
          </button>
          <div
            className={`navbar-collapse ${isDropdownOpen ? 'show' : ''}`}
            ref={dropdownRef}
          >
            <ul className="navbar-nav mx-auto ">
              {navItems.map((item) => (
                <li className="nav-item" key={item.id}>
                  <Link to={item.link} className="nav-link">
                    {item.name}
                    {item.img && <img src={item.img} alt={item.name} style={{ height: '40px' }} />}
                  </Link>
                </li>
              ))}
            </ul>
            <div className=" mx-lg-5">
              <a href="https://linktr.ee/codz.tech" target="_blank" rel="noopener noreferrer">
                <img src="https://1000logos.net/wp-content/uploads/2022/07/linktree-logo.png" alt="Linktree" style={{ height: '50px' }} />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
