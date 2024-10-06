import axios from 'axios';
import { idmConfig, credentials } from './config';

const url =
  process.env.NODE_ENV === 'development'
    ? `/api${idmConfig.apiPath}` 
    : `${idmConfig.url}${idmConfig.apiPath}`; 

// Konfiguration für die Authentifizierung
const config = {
  auth: credentials,
};

// Asynchrone Funktion zum Abrufen der Daten
async function fetchData() {
  try {
    const response = await axios.get(url, config);
    console.log('Daten erfolgreich abgerufen:', response.data);

    const resultList = response.data.resultList || [];

    let entries = 0;
    let exits = 0;
    let noInfo = 0;

    resultList.forEach(item => {
      if (item.attribute) { 
        let hasEntry = false;
        let hasExit = false;

        if (item.attribute.aieProcessSchedule) { 
          item.attribute.aieProcessSchedule.forEach(schedule => {
            const proc = getTaskDetail(schedule, 'proc');
            if (proc === 'P01') {
              hasEntry = true;
            } else if (proc === 'P02') {
              hasExit = true;
            }
          });
        }

        if (item.attribute.aieProcessHistory) {
          item.attribute.aieProcessHistory.forEach(history => {
            const proc = getTaskDetail(history, 'proc');
            if (proc === 'P01') {
              hasEntry = true;
            } else if (proc === 'P02') {
              hasExit = true;
            }
          });
        }

        if (hasEntry) {
          entries++;
        } else if (hasExit) {
          exits++;
        } else {
          noInfo++;
        }
      } else {
        noInfo++;
      }
    });

    const data = {
      entries,
      exits,
      noInfo,
      resultList  
    };

    return data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error.message);
    throw error;
  }
}

// Hilfsfunktion zum Extrahieren von Detailwerten aus den Strings
export function getTaskDetail(taskP, detailP) {
  var task = "" + taskP;
  var detail = "" + detailP + "=";
  var retVal = "";
  var partStr = "";

  if (task.indexOf(detail) === -1) { 
    retVal = "";
  } else {
    partStr = task.substr(task.indexOf(detail) + detail.length);
    if (partStr.indexOf("#") === -1) { // Extrahiere den Detailwert bis zum Ende oder bis zum nächsten '#'
      retVal = partStr;
    } else {
      retVal = partStr.substr(0, partStr.indexOf("#"));
    }
  }

  return retVal; 
}

// Funktion zur Formatierung eines Datumsstrings
export function printDate(myDate) {
  var myDateStr = "" + myDate;
  var retVal = "";
  try {
    var evtY = myDateStr.substr(0, 4);
    var evtM = myDateStr.substr(4, 2);
    var evtD = myDateStr.substr(6, 2);
    retVal = evtD + "." + evtM + "." + evtY; // Formatiere das Datum im Format TT.MM.JJJJ
  } catch (e) {}
  return retVal; 
}

export default fetchData;