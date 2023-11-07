import React, { useState } from "react";
import "../styles/barberDashboard.css";
import DashboardScheduleChart from "../components/DashboardScheduleChart";
import BarberDashboardUser from "../components/BarberDashboardUser";
import { useNavigate } from "react-router-dom";

function BarberDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("agendamentos");
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const changeTab = (option: string) => {
    setActiveTab(option);
    setIsMenuOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
              className="button-menu"
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
          <button
            className={activeTab === "barbeiro" ? "active" : ""}
            onClick={logout}
          >
            Sair
          </button>
        </nav>
      </aside>
      <main className="content">
        {activeTab === "agendamentos" && <DashboardScheduleChart />}
        {activeTab === "barbeiro" && <BarberDashboardUser />}
      </main>
    </div>
  );
}

export default BarberDashboard;
