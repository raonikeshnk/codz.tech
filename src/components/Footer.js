import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="container text-white">
        <div className="row align-items-center">
          <div className="col-sm-12">
           
            <ul className="list-inline mt-4 mb-0">
              <li className="list-inline-item">
                <a href="https://linktr.ee/codz.tech" target="_blank" rel="noopener noreferrer">
                  <img src="https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/Linktree_logo.svg/640px-Linktree_logo.svg.png" alt="Linktree" style={{height:'20px'}}/>
                </a>
              </li>
            </ul>

            <p className="mt-4 mb-4 title-font-2">
              ©2024 CodzTech. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;