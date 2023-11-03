import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo-1.png";
import "../styles/home.css";
import { useContext, useState } from "react";
import AgendamentosContext from "../context/AgendamentosContext";

function Home() {
  const navigate = useNavigate();
  const { resetStates } = useContext(AgendamentosContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="container-home" onClick={() => isMenuOpen && setIsMenuOpen(false)}>
      <nav className={`menu ${isMenuOpen ? "active" : ""}`}>
        <Link to='/login'>
          Login
        </Link>
      </nav>
      <div
        className={`menu-hamburguer ${isMenuOpen ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="container-logo-button">
        <section className="section-logo">
          <img src={logo} alt="logo" className="img-logo" />
        </section>
        <section>
          <p className="p-text">Escolha seu Barbeiro</p>
          <button
            className="barbeiro"
            onClick={() => {
              resetStates();
              navigate("/agendamentos");
            }}
          >
            Barbeiro Cleberson Silva (CHUCA)
          </button>
        </section>
      </div>
      <footer className="footer">
        <p>© 2023 Jonathan Febraio. All rights reserved.</p>
      </footer>
    </div>
  );
}
export default Home;
