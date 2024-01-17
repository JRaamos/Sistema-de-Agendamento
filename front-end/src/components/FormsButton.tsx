import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/formsButton.css";

function FormsButton() {
  const navigate = useNavigate();
  return (
    <form className="form-button">
      <button
        className="button-meus-agendamentos"
        onClick={(e) => {
          e.preventDefault();
          navigate("/mi-schedules");
        }}
      >
        Meus agendamentos
      </button>
      <button
        className="button-meus-agendamentos"
        onClick={() => location.reload()}
      >
        Novo agendamento
      </button>
    </form>
  );
}
export default FormsButton;
