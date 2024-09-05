// // Importiere axios Bibliothek für HTTP-Anfragen
// import axios from 'axios';
// // Importiere Konfigurations- und Anmeldeinformationen aus der config-Datei
// import { idmConfig, credentials } from './config';

// // Definiere die URL basierend auf der aktuellen Umgebung (Entwicklung oder Produktion)
// const url =
//   process.env.NODE_ENV === 'development'
//     ? `/api${idmConfig.apiPath}` // Entwicklunsumgebung: benutze lokalen API-Pfad
//     : `${idmConfig.url}${idmConfig.apiPath}`; // Produktionsumgebung: benutze vollständige URL

// // Konfiguration für die Authentifizierung
// const config = {
//   auth: credentials,
// };

// // Asynchrone Funktion zum Abrufen der Daten
// async function fetchData() {
//   try {
//     // Sende GET-Anfrage an die definierte URL mit Authentifizierung
//     const response = await axios.get(url, config);
//     // Logge die erfolgreich abgerufenen Daten
//     console.log('Daten erfolgreich abgerufen:', response.data);

//     // Extrahiere die Ergebnisliste oder setze sie auf ein leeres Array, falls nicht vorhanden
//     const resultList = response.data.resultList || [];

//     // Initialisiere Zähler für Einträge, Ausgänge und unbekannte Informationen
//     let entries = 0;
//     let exits = 0;
//     let noInfo = 0;

//     // Iteriere durch die Ergebnisliste und extrahiere Informationen
//     resultList.forEach(item => {
//       if (item.attribute) { // Überprüfe, ob das Attributfeld vorhanden ist
//         let hasEntry = false;
//         let hasExit = false;

//         if (item.attribute.aieProcessSchedule) { // Überprüfe den Prozessplan
//           item.attribute.aieProcessSchedule.forEach(schedule => {
//             const proc = getTaskDetail(schedule, 'proc');
//             if (proc === 'P01') {
//               hasEntry = true;
//             } else if (proc === 'P02') {
//               hasExit = true;
//             }
//           });
//         }

//         if (item.attribute.aieProcessHistory) { // Überprüfe die Prozesshistorie
//           item.attribute.aieProcessHistory.forEach(history => {
//             const proc = getTaskDetail(history, 'proc');
//             if (proc === 'P01') {
//               hasEntry = true;
//             } else if (proc === 'P02') {
//               hasExit = true;
//             }
//           });
//         }

//         // Aktualisiere die Zähler basierend auf den gefundenen Informationen
//         if (hasEntry) {
//           entries++;
//         } else if (hasExit) {
//           exits++;
//         } else {
//           noInfo++;
//         }
//       } else {
//         noInfo++;
//       }
//     });

//     // Erstelle ein Datenobjekt mit den Zählern und der Ergebnisliste
//     const data = {
//       entries,
//       exits,
//       noInfo,
//       resultList  // Ergebnisliste hinzufügen
//     };

//     // Gebe das Datenobjekt zurück
//     return data;
//   } catch (error) {
//     // Logge und werfe Fehler bei der Datenabfrage
//     console.error('Fehler beim Abrufen der Daten:', error.message);
//     throw error;
//   }
// }

// // Hilfsfunktion zum Extrahieren von Detailwerten aus den Strings
// export function getTaskDetail(taskP, detailP) {
//   var task = "" + taskP;
//   var detail = "" + detailP + "=";
//   var retVal = "";
//   var partStr = "";

//   if (task.indexOf(detail) === -1) { // Überprüfe, ob das Detail im String vorhanden ist
//     retVal = "";
//   } else {
//     partStr = task.substr(task.indexOf(detail) + detail.length);
//     if (partStr.indexOf("#") === -1) { // Extrahiere den Detailwert bis zum Ende oder bis zum nächsten '#'
//       retVal = partStr;
//     } else {
//       retVal = partStr.substr(0, partStr.indexOf("#"));
//     }
//   }

//   return retVal; // Gebe den extrahierten Wert zurück
// }

// // Funktion zur Formatierung eines Datumsstrings
// export function printDate(myDate) {
//   var myDateStr = "" + myDate;
//   var retVal = "";
//   try {
//     var evtY = myDateStr.substr(0, 4);
//     var evtM = myDateStr.substr(4, 2);
//     var evtD = myDateStr.substr(6, 2);
//     retVal = evtD + "." + evtM + "." + evtY; // Formatiere das Datum im Format TT.MM.JJJJ
//   } catch (e) {}
//   return retVal; // Gebe das formatierte Datum zurück
// }

// // Exportiere die fetchData Funktion als Standardexport
// export default fetchData;
