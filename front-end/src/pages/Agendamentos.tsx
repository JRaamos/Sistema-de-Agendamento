import React, { useContext, useEffect, useState } from "react";
import messagensInicials from "../utils/mensagens";
import "../styles/agendamentos.css";
import Services from "../components/Services";
import Welcome from "../components/Welcome";
import AgendamentosContext from "../context/AgendamentosContext";
import MensagemDate from "../components/MensagemDate";
import Calendar from "../components/Calendar";
import AppointmentTimes from "../components/AppointmentTimes";
import { format } from "date-fns";

import ptBR from "date-fns/locale/pt-BR";
import MensagemPhone from "../components/MensagemPhone";
import MensageConclusão from "../components/MensageConclusão";
import { useNavigate } from "react-router-dom";
import FormsButton from "../components/FormsButton";

function Agendamentos() {
  const [inputValue, setInputValue] = useState("");
  const [isName, setIsName] = useState(false);
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const navigate = useNavigate();
  const [istext, setIsText] = useState(false);
  const [isDate, setIsDate] = useState(false);
  const [phone, setPhone] = useState("");
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
    phoneBottom,
    isPhone,
    isMyAgendamentos,
    setIsPhone,
    isDates,
    agendamentos,
    setAgendamentos,
    disableInput,
    setDisableInput,
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
        setDisableInput(false);
      }
    }, 30);
    return () => clearInterval(typingInterval);
  }, []);

  const rendleAgendamentos = () => {
    const inputDate = new Date(values.date);
    const formattedDate = format(inputDate, "EEE, dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });
    setAgendamentos(`${formattedDate} as ${values.hour}`);
  };

  const handleValues = () => {
    if (!values.name) {
      setIsName(true);
      setValues({ ...values, name: inputValue });
      setInputValue("");
      setDisableButton(true);
      setDisableInput(true);
    }
    if (values.name && !values.services) {
      setValues({ ...values, services: servicesSelected });
      setInputValue("");
      setDisableButton(true);
      setIsDate(true);
    }
    if (values.services && values.date && values.hour && !values.phone) {
      setValues({ ...values, phone: inputValue });
      setPhone(inputValue);
      setInputValue("");
      setDisableButton(true);
      setDisableInput(true);
    }
  };

  const randonOnchange = (target: EventTarget & HTMLInputElement) => {
    setInputValue(target.value);
    if (!values.name) {
      if (target.value.length > 3) {
        setDisableButton(false);
      } else {
        setDisableButton(true);
      }
    }
    if (values.name && !values.services) {
      if (target.value.length > 3) {
        setDisableButton(false);
      } else {
        setDisableButton(true);
      }
    }
    if (values.services && values.date && values.hour && !values.phone) {
      if (target.value.length > 9) {
        setDisableButton(false);
      } else {
        setDisableButton(true);
      }
    }
  };
  const handleButtonClick = () => {
    handleValues();
    setIsServices(false);

    if (values.date) {
      rendleAgendamentos();
      setDisableButton(false);
      setIsAgendamentos(true);
      setValues({ ...values, agendamentos: agendamentos });
      setIsPhone(true);
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
          <section
            className={
              isPhone
                ? "section-name section-agendamento"
                : "section-name msg-bottom section-agendamento"
            }
          >
            {agendamentos}
          </section>
        </div>
      )}
      {isPhone && (
        <div className={phone ? "" : "msg-bottom"}>
          <section className="section-mensagem">{<MensagemPhone />}</section>
        </div>
      )}
      {phone && (
        <div className={phoneBottom ? "" : "msg-bottom"}>
          <section className="section-mensagem-usuario">
            <section className="section-name">
              <p>{phone}</p>
            </section>
          </section>
        </div>
      )}
      {phone && (
        <div className={isMyAgendamentos ? "" : "msg-bottom"}>
          {<MensageConclusão />}
        </div>
      )}
      {!isMyAgendamentos && (
        <form className="rodape">
          <label htmlFor="input-usuario">
            <input
              className="input-usuario"
              value={inputValue}
              onChange={({ target }) => {
                randonOnchange(target);
              }}
              type={isPhone ? "number" : "text"}
              disabled={disableInput}
            />
          </label>
          <button
            className="button-usuario"
            onClick={(e) => {
              e.preventDefault();
              handleButtonClick();
            }}
            disabled={disableButton}
          >
            Enviar
          </button>
        </form>
      )}

      {isMyAgendamentos && <FormsButton />}
    </div>
  );
}
export default Agendamentos;
