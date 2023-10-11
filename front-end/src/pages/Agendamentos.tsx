import React, { useContext, useEffect, useRef, useState } from "react";
import messagensInicials from "../utils/mensagens";
import "../styles/agendamentos.css";
import Services from "../components/Services";
import Welcome from "../components/Welcome";
import AgendamentosContext from "../context/AgendamentosContext";
import MensagemDate from "../components/MensagemDate";
import Calendar from "../components/Calendar";
import AppointmentTimes from "../components/AppointmentTimes";
import dayjs from "dayjs";
import { format } from "date-fns";

import ptBR from "date-fns/locale/pt-BR";
import MensagemPhone from "../components/MensagemPhone";
import { isMatchWithOptions } from "date-fns/fp";

function Agendamentos() {
  const [inputValue, setInputValue] = useState("");
  const [isName, setIsName] = useState(false);
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [istext, setIsText] = useState(false);
  const [isDate, setIsDate] = useState(false);
  const [agendamentos, setAgendamentos] = useState("");
  const [isAgendamentos, setIsAgendamentos] = useState(false);
  const {
    values,
    setValues,
    isServices,
    setIsServices,
    servicesSelected,
    disableButton,
    isServicesSelected,
    setDisableButton,
    selectedDate,
    isPhone,
    isDates,
  }: any = useContext(AgendamentosContext);

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
  const rendleAgendamentos = () => {
    const inputDate = new Date(values.date); // Substitua isso pela sua data
    const formattedDate = format(inputDate, "EEE, dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });
    setAgendamentos(`${formattedDate} as ${values.hour}`);
  };
  const renderName = () => {
    if (!values.name) {
      setIsName(true);
      setValues({ ...values, name: inputValue });
      setInputValue("");
      setDisableButton(true);
    }
    if (values.name && !values.services) {
      setValues({ ...values, services: servicesSelected });
      setInputValue("");
      setDisableButton(true);
      setIsDate(true);
    }
  };
  const randonOnchange = (target: EventTarget & HTMLInputElement) => {
    setInputValue(target.value);
    if (target.value.length > 3) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  };
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
          <section
            className={
              isServicesSelected
                ? "section-mensagem"
                : "section-mensagem msg-bottom"
            }
          >
            <section>{<Services />}</section>
          </section>
        )}
      </div>
      {isServicesSelected && (
        <div>
          {servicesSelected && (
            <div className="section-mensagem-usuario">
              <section
                className={
                  isDate
                    ? "section-name msg-selected"
                    : "section-name msg-selected msg-bottom"
                }
              >
                {servicesSelected.map((service: any) => (
                  <p key={service} className="services-selected">
                    {service}
                  </p>
                ))}
              </section>
            </div>
          )}
        </div>
      )}
      {isDate && (
        <div>
          <section className="section-mensagem ">
            <section>{<MensagemDate />}</section>
          </section>
        </div>
      )}
      {isDates && (
        <section className={selectedDate ? "" : "msg-bottom"}>
          {<Calendar />}
        </section>
      )}
      {selectedDate && (
        <div className="hours">
          <section className={isAgendamentos ? "" : "msg-bottom"}>
            {
              <AppointmentTimes
                selectedDate={selectedDate}
                selectedServices={servicesSelected}
              />
            }
          </section>
        </div>
      )}
      {isAgendamentos && (
        <div className="section-mensagem-usuario">
          <section className="section-name msg-bottom section-agendamento">
            {agendamentos}
          </section>
        </div>
      )}
      {isPhone && (
        <div>
          <section className="section-mensagem">{<MensagemPhone />}</section>
        </div>
      )}
      <form className="rodape">
        <label htmlFor="input-usuario">
          <input
            className="input-usuario"
            value={inputValue}
            onChange={({ target }) => {
              randonOnchange(target);
            }}
            type="text"
          />
        </label>
        <button
          type="button"
          className="button-usuario"
          onClick={(e) => {
            e.preventDefault();
            renderName();
            setIsServices(false);
            if (values.date) {
              rendleAgendamentos();
              setDisableButton(false);
              setIsAgendamentos(true);
            }
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
