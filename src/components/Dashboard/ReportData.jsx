import React, { useEffect, useState } from "react";
import fetchData, { getTaskDetail, printDate } from "../fetchData"; 
import "./CSS/dashboard.css"; 

function ReportData() {
  const [usersWithFutureEntries, setUsersWithFutureEntries] = useState([]);

  useEffect(() => {
    const fetchUserEntries = async () => {
      try {
        const data = await fetchData();

        if (data && data.resultList) {
          const futureEntries = data.resultList.filter((item) => {
            if (
              item.name &&
              item.attribute &&
              item.attribute.aieProcessSchedule
            ) {
              return item.attribute.aieProcessSchedule.some((schedule) => {
                const proc = getTaskDetail(schedule, "proc"); 
                if (proc === "P01") {
                  const startDate = getTaskDetail(schedule, "start"); 
                  if (startDate) {
                    const date = new Date(
                      startDate.substr(0, 4) +
                        "-" +
                        startDate.substr(4, 2) +
                        "-" +
                        startDate.substr(6, 2)
                    ); 
                    return date > new Date(); 
                  }
                }
                return false;
              });
            }
            return false;
          });

          setUsersWithFutureEntries(futureEntries); 
        } else {
          console.error(
            "Daten von fetchData sind ungültig oder resultList ist nicht vorhanden."
          );
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error.message); 
      }
    };

    fetchUserEntries(); 
  }, []); 

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

function removeCnPrefix(name) {
  return name.startsWith("cn=") ? name.substring(3) : name;
}

function getDateFromSchedule(aieProcessSchedule) {
  if (!aieProcessSchedule) return ""; 
  const dateString = aieProcessSchedule.find((schedule) =>
    schedule.startsWith("start=")
  ); 
  if (dateString) {
    const startDate = getTaskDetail(dateString, "start"); 
    return printDate(startDate); 
  }
  return ""; 
}

export default ReportData; 
