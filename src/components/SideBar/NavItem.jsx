// Importiere React, um React-Komponenten zu definieren
import React from 'react';

// Definiere die NavItem-Komponente und übergebe das props-Objekt als Argument
function NavItem({ nav }) {
  // Rendere ein Navigationselement als <li> mit der Klasse "nav-item"
  return (
    <li className="nav-item"> {/* Rendere einen Link als <a> mit der Klasse "nav-link collapsed" und einem leeren href-Attribut */}
      <a className="nav-link collapsed"> {/* Rendere ein Icon als <i> mit der Klasse, die im nav-Objekt angegeben ist */}
        <i className={nav.icon}></i> {/* Rendere einen Text als <span>, der den Namen des Navigationselements enthält */}
        <span>{nav.name}</span>
      </a>
    </li>
  );
}

export default NavItem;
