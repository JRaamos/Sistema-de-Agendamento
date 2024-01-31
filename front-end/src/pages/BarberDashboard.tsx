import React, { useContext, useEffect, useState } from 'react';
import '../styles/barberDashboard.css';
import DashboardScheduleChart from '../components/DashboardScheduleChart';
import BarberDashboardUser from '../components/BarberDashboardUser';
import { useNavigate } from 'react-router-dom';
import AgendamentosContext from '../context/AgendamentosContext';
import Schedules from '../components/Schedules';
import { fetchApiGetDayOff } from '../utils/fetchApi';
import MenuHamburguer from '../components/MenuHamburguer';
import BarberPriceService from '../components/BarberService';

function BarberDashboard() {
  const navigate = useNavigate();
  // MenuHamburguer
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Informações');

  const {
    setIsOffDay,
    setSelectedOffDays,
    selectedOffDay,
    setSelectedOffDay,
    setConfirmOffDay,
    setOffDays,
    setSelectedDay,
    setIsRecurrentClient,
    containerRef,
  } = useContext(AgendamentosContext);

  // MenuHamburguer
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const changeTab = (option: string) => {
    setActiveTab(option);
    setIsMenuOpen(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
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

  return (
    <div
      className="dashboard-container"
      onClick={() => isMenuOpen && setIsMenuOpen(false)}
    >
      <MenuHamburguer isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
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
                <li
                  className={activeTab === "Preços" ? "active" : ""}
                  onClick={() => {
                    changeTab("Preços");
                  }}
                >
                  Serviços
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
        {activeTab === "Preços" && <BarberPriceService />}
      </main>
    </div>
  );
}

export default BarberDashboard;
