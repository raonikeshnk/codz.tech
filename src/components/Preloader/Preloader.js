// Preloader.js

import React from "react";
import "./Preloader.scss"; // CSS for styling the preloader (if needed)

const Preloader = () => {
  return (
    <div className="preloader-container">
        <div className="logo-container">
        <div className="circular-animation"></div>
        <img src="/images/codztech_logo.png" alt="CodzTech Logo" className="logo-img" />
      </div>
      {/* <div className="preloader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div> */}
    </div>
  );
};

export default Preloader;
