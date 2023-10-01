import React, { useContext, useEffect, useRef, useState } from "react";
import messagensInicials from "../utils/mensagens";
import "../styles/agendamentos.css";
import Services from "../components/Services";
import Welcome from "../components/Welcome";
import AgendamentosContext from "../context/AgendamentosContext";

function Agendamentos() {
  const [name, setName] = useState("");
  const [isName, setIsName] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [istext, setIsText] = useState(false);

  const { values, setValues, isServices, setIsServices }: any =
    useContext(AgendamentosContext);
  useEffect(() => {
    const textoArray1 = messagensInicials.mensagem01.split("");
    const textoArray2 = messagensInicials.mensagem02.split("");
    let currentText1 = "";
    let currentText2 = "";

    const typingInterval = setInterval(() => {
      if (textoArray1.length > 0) {
        currentText1 += textoArray1.shift();
        setText(currentText1);
      } else if (textoArray2.length > 0) {
        setIsText(true);
        currentText2 += textoArray2.shift();
        setText2(currentText2);
      } else {
        clearInterval(typingInterval);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, []);

  const renderName = () => {
    if (!values.name) {
      setIsName(true);
      setValues({ ...values, name });
      setName("");
    }
  };
  const randonOnchange = (target: EventTarget & HTMLInputElement) => {
    setName(target.value);
    if (target.value.length > 3) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  };
  const servicesSelected = () => {};
  return (
    <div className="container-agendamentos">
      <div>
        <section className="section-mensagem">
          <div>
            <p className="digitando">{text}</p>
          </div>
        </section>
        {istext && (
          <section className="section-mensagem">
            <p>{text2}</p>
          </section>
        )}
      </div>
      {isName && (
        <section className="section-mensagem-usuario">
          <section className="section-name">
            <p>{values.name}</p>
          </section>
        </section>
      )}
      <div>
        {isName && <div>{<Welcome />}</div>}
        {isServices && (
          <section className="section-mensagem msg-bottom">
            <p>{<Services />}</p>
          </section>
        )}
      </div>
      <form className="rodape">
        <label htmlFor="input-usuario">
          <input
            className="input-usuario"
            value={name}
            onChange={({ target }) => {
              randonOnchange(target);
            }}
            type="text"
          />
        </label>
        <button
          type="button"
          className="button-usuario"
          onClick={() => {
            renderName();
          }}
          disabled={disableButton}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
export default Agendamentos;
