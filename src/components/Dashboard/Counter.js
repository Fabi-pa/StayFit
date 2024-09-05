import { getTaskDetail } from './fetchData';

function countEntries(resultList) {
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
          if (proc) {
            if (proc === 'P01') {
              hasEntry = true; 
            } else if (proc === 'P02') {
              hasExit = true; 
            }
          }
        });
      }

      if (item.attribute.aieProcessHistory) {
        item.attribute.aieProcessHistory.forEach(history => {
          const proc = getTaskDetail(history, 'proc'); 
          if (proc) {
            if (proc === 'P01') {
              hasEntry = true; 
            } else if (proc === 'P02') {
              hasExit = true; 
            }
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

  return {
    entries,
    exits,
    noInfo
  };
}

export default countEntries;
