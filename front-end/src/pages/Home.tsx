import { useNavigate } from "react-router-dom";
import logo from "../images/logo-1.png";
import "../styles/home.css";
import { useContext } from "react";
import AgendamentosContext from "../context/AgendamentosContext";

function Home() {
  const navigate = useNavigate();
  const { resetStates } = useContext(AgendamentosContext);

  return (
    <div className="container-home">
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
