import React, { useContext, useEffect, useState } from "react";
import "../styles/barberDashboard.css";
import DashboardScheduleChart from "../components/DashboardScheduleChart";
import BarberDashboardUser from "../components/BarberDashboardUser";
import { useNavigate } from "react-router-dom";
import AgendamentosContext from "../context/AgendamentosContext";
import Schedules from "../components/Schedules";
import { fetchApiGetDayOff } from "../utils/fetchApi";

function BarberDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Informações");

  const {
    setIsOffDay,
    setSelectedOffDays,
    selectedOffDay,
    setSelectedOffDay,
    setConfirmOffDay,
    setOffDays,
    setSelectedDay,
    setIsRecurrentClient,
  } = useContext(AgendamentosContext);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
 useEffect(() => {
   const handleOffDays = async () => {
     const data = await fetchApiGetDayOff();
     if (data) {
       setOffDays(data);
     }
   };
   handleOffDays();
 }, []);
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
            <div className="options-menu">
              <div>
                <li
                  className={activeTab === "Informações" ? "active" : ""}
                  onClick={() => changeTab("Informações")}
                >
                  Informações
                </li>
                <li
                  className={activeTab === "Agendar cliente" ? "active" : ""}
                  onClick={() => {
                    changeTab("Agendar cliente");
                    setSelectedOffDays({});
                    selectedOffDay.length > 0 && setSelectedOffDay([]);
                    setConfirmOffDay(false);
                    setIsRecurrentClient(true);
                    setIsOffDay(false);
                  }}
                >
                  Agendar cliente
                </li>
                <li
                  className={activeTab === "Agendar folga" ? "active" : ""}
                  onClick={() => {
                    changeTab("Agendar folga");
                    setSelectedOffDays({});
                    selectedOffDay.length > 0 && setSelectedOffDay([]);
                    setConfirmOffDay(false);
                    setIsOffDay(true);
                    setIsRecurrentClient(false);
                     setSelectedDay(null);
                  }}
                >
                  Agendar folga
                </li>
                <li
                  className={activeTab === "Agendamentos" ? "active" : ""}
                  onClick={() => {
                    changeTab("Agendamentos");
                    setSelectedOffDays({});
                    selectedOffDay.length > 0 && setSelectedOffDay([]);
                    setConfirmOffDay(false);
                    setIsOffDay(true);
                    setIsRecurrentClient(false);
                     setSelectedDay(null);
                  }}
                >
                  Agendamentos
                </li>
              </div>

              <li onClick={logout}>Sair</li>
            </div>
          </ul>
        </nav>
      </aside>
      <main className="content">
        {activeTab === "Informações" && <DashboardScheduleChart />}
        {(activeTab === "Agendar cliente" || activeTab === "Agendar folga") && (
          <BarberDashboardUser />
        )}
        {activeTab === "Agendamentos" && <Schedules />}
      </main>
    </div>
  );
}

export default BarberDashboard;
