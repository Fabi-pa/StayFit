// Importiere notwendige Module und Funktionen
import React, { useEffect, useState } from "react"; // React und Hooks importieren
import fetchData, { getTaskDetail, printDate } from "../fetchData"; // fetchData und Hilfsfunktionen importieren
import "./CSS/dashboard.css"; // Stylesheet importieren

// Definiere die ReportData-Komponente
function ReportData() {
  // Definiere einen State-Hook für Benutzer mit zukünftigen Einträgen
  const [usersWithFutureEntries, setUsersWithFutureEntries] = useState([]);

  // Effekt-Hook zum Abrufen von Daten beim Mounten der Komponente
  useEffect(() => {
    // Asynchrone Funktion zum Abrufen von Benutzereinträgen
    const fetchUserEntries = async () => {
      try {
        const data = await fetchData(); // Daten von fetchData abrufen

        // Überprüfen, ob data.resultList definiert ist
        if (data && data.resultList) {
          // Filtere Benutzer mit zukünftigen Einträgen
          const futureEntries = data.resultList.filter((item) => {
            if (
              item.name &&
              item.attribute &&
              item.attribute.aieProcessSchedule
            ) {
              return item.attribute.aieProcessSchedule.some((schedule) => {
                const proc = getTaskDetail(schedule, "proc"); // Prozess aus dem Zeitplan extrahieren
                if (proc === "P01") {
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

          setUsersWithFutureEntries(futureEntries); // Benutzer mit zukünftigen Einträgen setzen
        } else {
          console.error(
            "Daten von fetchData sind ungültig oder resultList ist nicht vorhanden."
          );
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error.message); // Fehler behandeln
      }
    };

    fetchUserEntries(); // Funktion zum Abrufen von Benutzereinträgen aufrufen
  }, []); // Leeres Abhängigkeitsarray sorgt dafür, dass der Effekt nur einmal beim Mounten ausgeführt wird

  // Rendern der Komponente
  return (
    <div>
      <ul className="user-list card-title">
        {usersWithFutureEntries.map((user, index) => (
          <li key={index}>
            {removeCnPrefix(user.name)} -{" "}
            {getDateFromSchedule(user.attribute.aieProcessSchedule)} - Entry
          </li>
        ))}
      </ul>
    </div>
  );
}

// Funktion zum Entfernen des "cn=" Präfixes
function removeCnPrefix(name) {
  return name.startsWith("cn=") ? name.substring(3) : name;
}

// Funktion zum Extrahieren des Datums aus aieProcessSchedule
function getDateFromSchedule(aieProcessSchedule) {
  if (!aieProcessSchedule) return ""; // Wenn kein Zeitplan vorhanden ist, leere Zeichenkette zurückgeben
  const dateString = aieProcessSchedule.find((schedule) =>
    schedule.startsWith("start=")
  ); // Datum aus Zeitplan extrahieren
  if (dateString) {
    const startDate = getTaskDetail(dateString, "start"); // Startdatum extrahieren
    return printDate(startDate); // Datum formatieren und zurückgeben
  }
  return ""; // Andernfalls leere Zeichenkette zurückgeben
}

export default ReportData; // ReportData exportieren
