import React from "react";
import "./FooterCSS/footer.css";

function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="copyright">
        &copy; Copyright 
        <strong>
          <span>Future</span>
        </strong>
        . All Rights Reserved
      </div>
      <div className="credits">
        Developed by <a href="#">Fabian Parzer</a>
      </div>
    </footer>
  );
}

// Exportiert die Footer-Komponente als Standardexport
export default Footer;
