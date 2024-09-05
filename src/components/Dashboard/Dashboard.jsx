import React, { useEffect, useState } from "react"; 
import fetchData from "../fetchdata"; 
import Card from "./Card"; 
import "./DashboardCSS/dashboard.css"; 
import Reports from "./Reports"; 
import RecentActivity from "./RecentActivity"; 

function Dashboard() {
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
      name: "User Entries",
      icon: "bi bi-person-plus",
      amount: data.entries, 
    },
    {
      name: "User Exits", 
      icon: "bi bi-person-dash", 
      amount: data.exits, 
    },
    {
      name: "No Attributes", 
      icon: "bi bi-person-x",
      amount: data.noInfo, 
    },
  ];

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
        <div className="col-lg-4">
          <RecentActivity />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;