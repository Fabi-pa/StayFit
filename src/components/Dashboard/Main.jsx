import React from "react";
import "./CSS/main.css";
import PageTitle from "./PageTitle";
import Dashboard from "./Dashboard";
import Documents from "./Documents";
import { Routes, Route } from "react-router-dom";
import Container from "./Container";

function Main() {
  return (
    <main id="main" className="main">
      <PageTitle page="Dashboard" />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Documents" element={<Documents />} />
        <Route path="/Container" element={<Container />} />
      </Routes>
    </main>
  );
}

export default Main;
