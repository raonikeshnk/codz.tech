import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { navItems } from "lib/data/navItems";

const Navbar = () => {
  return (
    <header className="header-transparent">
      <nav className="navbar navbar-expand-lg text-center">
        <div className="container">
          <Link to="/" className="navbar-brand">
            CodzTech
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <i className="fi-xwluxl-three-bars-wide"></i>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {navItems.map((item) => {
              return (
                <ul className="navbar-nav ml-auto" key={item.id}>
                  <li className="nav-item">
                    <Link to={item.link} className="nav-link">
                      {item.name}
                      {item.img && <img src={item.img} alt={item.name} style={{ height: '40px' }} />}
                    </Link>
                  </li>
                </ul>
              );
            })}
            <div className="mt-lg-4 mx-lg-5">
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
