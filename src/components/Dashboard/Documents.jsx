import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./DashboardCSS/documents.css";
import Reports from "./Reports";
import fetchData from "../fetchdata";

function Documents() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error.message);
      }
    };

    fetchDataAsync();
  }, []);

  if (!data) {
    return <p>Lade Daten...</p>;
  }

  const cards = [
    {
      name: "User ",
      icon: "bi bi-person-plus",
      amount: data.entries,
    },
    {
      name: "User E",
      icon: "bi bi-person-dash",
      amount: data.exits,
    },
    {
      name: "No A",
      icon: "bi bi-person-x",
      amount: data.noInfo,
    },
  ];

  <ul className="user-list card-title"></ul>;
  return (
    <section className="dashboard section">
      <div className="row">
        <div className="col-lg-8">
          <div className="row">
            {cards.map((card, index) => (
              <Card key={index} card={card} />
            ))}
            <div className="col-12">
              <Reports />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Documents;
