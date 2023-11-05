import React, { useState } from "react";
import "../styles/barberDashboard.css";
import DashboardSchedule from "../components/DashboardSchedule";
import BarberDashboardUser from "../components/BarberDashboardUser";

function BarberDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("agendamentos");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const changeTab = (option: string) => {
    setActiveTab(option);
    setIsMenuOpen(false);
  };

  return (
    <div
      className="dashboard-container"
      onClick={() => isMenuOpen && setIsMenuOpen(false)}
    >
      <div
        className={`menu-hamburguer ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <aside className={`sidebar ${isMenuOpen ? "active" : ""}`}>
        <nav>
          <ul>
            <li
              className={activeTab === "agendamentos" ? "active" : ""}
              onClick={() => changeTab("agendamentos")}
            >
              Agendamentos
            </li>
            <li
              className={activeTab === "barbeiro" ? "active" : ""}
              onClick={() => changeTab("barbeiro")}
            >
              Barbeiro
            </li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        {activeTab === "agendamentos" && <DashboardSchedule />}
        {activeTab === "barbeiro" && <BarberDashboardUser />}
      </main>
    </div>
  );
}

export default BarberDashboard;
