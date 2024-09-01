import React, { useEffect, useState } from "react";
import fetchData, { getTaskDetail, printDate } from "../fetchData";
import "./CSS/recentActivity.css";
import CardFilter from "./CardFilter";

function RecentActivity() {
  const [filter, setFilter] = useState("Today");
  const handleFilterChange = (filter) => {
    setFilter(filter);
  };
  // Definiere einen State-Hook für Benutzer mit zukünftigen Einträgen
  const [usersWithFutureExits, setUsersWithFutureExits] = useState([]);

  // Effekt-Hook zum Abrufen von Daten beim Mounten der Komponente
  useEffect(() => {
    // Asynchrone Funktion zum Abrufen von Benutzereinträgen
    const fetchUserExits = async () => {
      try {
        const data = await fetchData(); // Daten von fetchData abrufen

        // Überprüfen, ob data.resultList definiert ist
        if (data && data.resultList) {
          // Filtere Benutzer mit zukünftigen Einträgen
          const futureExits = data.resultList.filter((item) => {
            if (
              item.name &&
              item.attribute &&
              item.attribute.aieProcessSchedule
            ) {
              return item.attribute.aieProcessSchedule.some((schedule) => {
                const proc = getTaskDetail(schedule, "proc"); // Prozess aus dem Zeitplan extrahieren
                if (proc === "P02") {
                  // Überprüfen, ob Datum in der Zukunft liegt
                  const startDate = getTaskDetail(schedule, "start"); // Startdatum extrahieren
                  if (startDate) {
                    const date = new Date(
                      startDate.substr(0, 4) +
                        "-" +
                        startDate.substr(4, 2) +
                        "-" +
                        startDate.substr(6, 2)
                    ); // Datum erstellen
                    return date > new Date(); // Datum mit aktuellem Datum vergleichen
                  }
                }
                return false;
              });
            }
            return false;
          });

          setUsersWithFutureExits(futureExits); // Benutzer mit zukünftigen Einträgen setzen
        } else {
          console.error(
            "Daten von fetchData sind ungültig oder resultList ist nicht vorhanden."
          );
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error.message); // Fehler behandeln
      }
    };

    fetchUserExits(); // Funktion zum Abrufen von Benutzereinträgen aufrufen
  }, []); // Leeres Abhängigkeitsarray sorgt dafür, dass der Effekt nur einmal beim Mounten ausgeführt wird

  return (
    <div className="card">
      <CardFilter filterChange={handleFilterChange} />
      <div className="card-body">
        <h5 className="card-title">Users with future exits:</h5>
        <div>
          <ul className="user-list card-title">
            {usersWithFutureExits.map((user, index) => (
              <li key={index}>
                {removeCnPrefix(user.name)} -{" "}
                {getDateFromSchedule(user.attribute.aieProcessSchedule)} - Exit
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function removeCnPrefix(name) {
  return name.startsWith("cn=") ? name.substring(3) : name;
}

function getDateFromSchedule(aieProcessSchedule) {
  if (!aieProcessSchedule) return "";
  const startDate = Object.keys(aieProcessSchedule).find((key) =>
    aieProcessSchedule[key].startsWith("start=")
  );
  if (startDate) {
    const date = getTaskDetail(aieProcessSchedule[startDate], "start");
    return printDate(date);
  }
  return "";
}

export default RecentActivity;
