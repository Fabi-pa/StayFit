import React, { useEffect, useState } from "react";
import fetchData, { getTaskDetail, printDate } from "..";
import "./DashboardCSS/recentActivity.css";
import CardFilter from "./CardFilter";

function RecentActivity() {
  const [filter, setFilter] = useState("Today");
  const handleFilterChange = (filter) => {
    setFilter(filter);
  };
  const [usersWithFutureExits, setUsersWithFutureExits] = useState([]);

  useEffect(() => {
    const fetchUserExits = async () => {
      try {
        const data = await fetchData(); 

        if (data && data.resultList) {
          const futureExits = data.resultList.filter((item) => {
            if (
              item.name &&
              item.attribute &&
              item.attribute.aieProcessSchedule
            ) {
              return item.attribute.aieProcessSchedule.some((schedule) => {
                const proc = getTaskDetail(schedule, "proc"); 
                if (proc === "P02") {
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

          setUsersWithFutureExits(futureExits);
        } else {
          console.error(
            "Daten von fetchData sind ungültig oder resultList ist nicht vorhanden."
          );
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error.message); 
      }
    };

    fetchUserExits();
  }, []);

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
