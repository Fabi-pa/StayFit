// Importiere die getTaskDetail-Funktion aus fetchData
import { getTaskDetail } from './fetchData';

// Definiere die Funktion countEntries, die die Einträge in einer Ergebnisliste zählt
function countEntries(resultList) {
  // Initialisiere Zähler für Einträge, Ausgänge und fehlende Informationen
  let entries = 0;
  let exits = 0;
  let noInfo = 0;

  // Iteriere durch jedes Element in der resultList
  resultList.forEach(item => {
    if (item.attribute) {
      let hasEntry = false; // Flag für Einträge
      let hasExit = false; // Flag für Ausgänge

      // Überprüfe aieProcessSchedule-Attribut
      if (item.attribute.aieProcessSchedule) {
        item.attribute.aieProcessSchedule.forEach(schedule => {
          const proc = getTaskDetail(schedule, 'proc'); // Extrahiere den Prozesswert
          if (proc) {
            if (proc === 'P01') {
              hasEntry = true; // Setze das Flag für Einträge
            } else if (proc === 'P02') {
              hasExit = true; // Setze das Flag für Ausgänge
            }
          }
        });
      }

      // Überprüfe aieProcessHistory-Attribut
      if (item.attribute.aieProcessHistory) {
        item.attribute.aieProcessHistory.forEach(history => {
          const proc = getTaskDetail(history, 'proc'); // Extrahiere den Prozesswert
          if (proc) {
            if (proc === 'P01') {
              hasEntry = true; // Setze das Flag für Einträge
            } else if (proc === 'P02') {
              hasExit = true; // Setze das Flag für Ausgänge
            }
          }
        });
      }

      // Aktualisiere die Zähler basierend auf den Flags
      if (hasEntry) {
        entries++;
      } else if (hasExit) {
        exits++;
      } else {
        noInfo++;
      }
    } else {
      noInfo++; // Erhöhe den Zähler für fehlende Informationen, wenn kein attribute vorhanden ist
    }
  });

  // Gib die Zähler als Objekt zurück
  return {
    entries,
    exits,
    noInfo
  };
}

// Exportiere die countEntries-Funktion für die Verwendung in anderen Dateien
export default countEntries;
