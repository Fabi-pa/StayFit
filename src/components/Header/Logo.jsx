import React from 'react';
import './HeaderCSS/logo.css';

function Logo() {
  const handleToggleSideBar = () => {
    document.body.classList.toggle('toggle-sidebar');
  };

  return (
    <div className="d-flex align-items-center justify-content-between"> 
      <a href="/" className="logo d-flex align-items-center"> 
        {/* <img src="" alt=""/> Bild für das Logo, falls benötigt */}
        <span className="d-none d-lg-block">StayFit</span> 
      </a>
      <i 
        className="bi bi-list toggle-sidebar-btn" 
        onClick={handleToggleSideBar} 
      ></i>
    </div>
  );
}

export default Logo;
