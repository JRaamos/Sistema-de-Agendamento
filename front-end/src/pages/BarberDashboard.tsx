import React, { useState } from "react";
import "../styles/barberDashboard.css"; 

function BarberDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Estado para controlar qual aba está ativa.
  const [activeTab, setActiveTab] = useState("agendamentos");

  // Função para alternar a visibilidade do menu.
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Função para trocar a aba e ocultar o menu.
  const changeTab = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  return (
    <div className="dashboard-container" onClick={()=>isMenuOpen && setIsMenuOpen(false)}>
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
        {activeTab === "agendamentos" && <div>Conteúdo dos Agendamentos</div>}
        {activeTab === "barbeiro" && <div>Conteúdo do Barbeiro</div>}
      </main>
    </div>
  );
}

export default BarberDashboard;
