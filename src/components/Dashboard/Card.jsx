import React, { useState } from "react";
import "./DashboardCSS/card.css";
import CardFilter from "./CardFilter";

function Card({ card }) {
  const [filter, setFilter] = useState("Today");
  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const amount = card.amount ?? 0;

  return (
    <div className="col-xxl-4 col-md-6">
      <div className="card info-card sales-card">
        <CardFilter filterChange={handleFilterChange} />
        <div className="card-body">
          <h5 className="card-title">
            {card.name}
            <span> | {filter}</span>
          </h5>
          <div className="d-flex align-items-center">
            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
              <i className={card.icon}></i>
            </div>
            <div className="ps-3">
              <h6>{amount.toLocaleString("en-US")}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
