import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Overview from "./views/Overview";
import Inventory from "./views/Inventory";
import Record from "./views/Record";
import Patient from "./views/Patient";

const App: React.FC = () => {
  const navLinks = [
    { name: "Overview", path: "/" },
    { name: "Inventory", path: "/inventory" },
    { name: "Record", path: "/record" },
    { name: "Patient", path: "/patient" },
  ];

  return (
    <Router>
      <div className="App">
        <Navbar links={navLinks} />
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/record" element={<Record />} />
          <Route path="/patient" element={<Patient />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
