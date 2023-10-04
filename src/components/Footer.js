// Footer.js

import React from "react";

const Footer = () => {
  return (
    <footer className="footer text-center mt-3">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Victor Henrique</p>
        <p>
          Visite o perfil no GitHub:{" "}
          <a
            href="https://github.com/victxl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none"
          >
            github.com/victxl
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
