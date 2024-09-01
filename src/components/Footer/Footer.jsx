// Importiert die React-Bibliothek
import React from "react";
// Importiert die CSS-Datei für das Styling der Footer-Komponente
import "./CSS/footer.css";

// Definiert die Footer-Komponente als eine Funktion
function Footer() {
  return (
    // Erstellt ein HTML-Footer-Element mit der ID "footer" und der CSS-Klasse "footer"
    <footer id="footer" className="footer">
      {/* Erstellt einen div-Container für den Copyright-Hinweis */}
      <div className="copyright">
        {/* Zeigt das Copyright-Symbol an */}
        &copy; Copyright {/* Hebt den Firmennamen "IS4IT GmbH" hervor */}
        <strong>
          <span>IS4IT GmbH</span>
        </strong>
        . All Rights Reserved
      </div>
      {/* Erstellt einen div-Container für die Design-Credits */}
      <div className="credits">
        {/* Zeigt den Text "Designed by" an und verlinkt auf "Fabian Parzer" */}
        Developed by <a href="#">Fabian Parzer</a>
      </div>
    </footer>
  );
}

// Exportiert die Footer-Komponente als Standardexport
export default Footer;
