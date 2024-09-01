// Importiere notwendige Module und Komponenten
import React, { useEffect, useState } from "react"; // Importiere React und Hooks
import fetchData from "../fetchData"; // Importiere die fetchData Funktion
import Card from "./Card"; // Importiere die Card Komponente
import "./CSS/dashboard.css"; // Importiere die CSS Datei für das Dashboard Styling
import Reports from "./Reports"; // Importiere die Reports Komponente
import RecentActivity from "./RecentActivity"; // Importiere die RecentActivity Komponente

function Dashboard() {
  const [data, setData] = useState(null); // Definiere einen State-Hook für die Daten

  useEffect(() => {
    // Definiere eine asynchrone Funktion zum Abrufen der Daten
    const fetchDataAsync = async () => {
      try {
        const fetchedData = await fetchData(); // Rufe Daten ab
        setData(fetchedData); // Setze die abgerufenen Daten in den State
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error.message); // Logge Fehler
      }
    };

    fetchDataAsync(); // Rufe die asynchrone Funktion auf
  }, []); // Leeres Abhängigkeitsarray sorgt dafür, dass der Effekt nur einmal beim Mounten ausgeführt wird

  if (!data) {
    return <p>Lade Daten...</p>; // Zeige Ladezustand an, solange Daten noch nicht verfügbar sind
  }

  // Definiere die Karten mit den entsprechenden Daten
  const cards = [
    {
      name: "User Entries", // Name der Karte
      icon: "bi bi-person-plus", // Icon der Karte
      amount: data.entries, // Anzahl der Einträge
    },
    {
      name: "User Exits", // Name der Karte
      icon: "bi bi-person-dash", // Icon der Karte
      amount: data.exits, // Anzahl der Ausgänge
    },
    {
      name: "No Attributes", // Name der Karte
      icon: "bi bi-person-x", // Icon der Karte
      amount: data.noInfo, // Anzahl der Einträge ohne Attribute
    },
  ];

  return (
    // Definiere die Struktur des Dashboards
    <section className="dashboard section">
      <div className="row">
        <div className="col-lg-8">
          <div className="row">
            {cards.map((card, index) => (
              <Card key={index} card={card} /> // Rendern der Kartenkomponenten
            ))}
            <div className="col-12">
              <Reports />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <RecentActivity />
        </div>
      </div>
    </section>
  );
}

export default Dashboard; // Exportiere die Dashboard Komponente als Standardexport
