import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/agendamentos.css";
import Services from "../components/Services";
import arrow from "../images/arrow-1.svg";
import Welcome from "../components/Welcome";
import AgendamentosContext from "../context/AgendamentosContext";
import MensagemDate from "../components/MensagemDate";
import Calendar from "../components/Calendar";
import AppointmentTimes from "../components/AppointmentTimes";
import MensagemPhone from "../components/MensagemPhone";
import MensageConclusão from "../components/MensageConclusão";
import FormsButton from "../components/FormsButton";
import Introduction from "../components/Introduction";
import FormsInput from "../components/FormsInput";
import { useNavigate } from "react-router-dom";
import OneSignal from "react-onesignal";

function Agendamentos() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const {
    isServices,
    isDate,
    phone,
    servicesSelected,
    isAgendamentos,
    isName,
    isServicesSelected,
    containerRef,
    msgServices,
    selectedDate,
    phoneBottom,
    isPhone,
    isMyAgendamentos,
    canRender,
    setIsName,
    isDates,
    resetStates,
    agendamentos,
    setValues,
    values,
    availableTimes,
  } = useContext(AgendamentosContext);
  const [buttomMeusAgendamentos, setButtomMeusAgendamentos] = useState(false);

  useEffect(() => {
    resetStates();
  }, [location]);
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollHeight = container.scrollHeight;
      container.scrollTop = scrollHeight;
    }
  }, [
    isServices,
    selectedDate,
    availableTimes,
    isAgendamentos,
    isPhone,
    phone,
    canRender,
    msgServices,
    servicesSelected,
    isDates,
  ]);

  useEffect(() => {
    const usuario = localStorage.getItem("name");
    if (usuario) {
      const result = JSON.parse(usuario);
      setName(result);
      setValues({ ...values, name: result });
      if (result) {
        setIsName(true);
        setButtomMeusAgendamentos(true);
      }
    }
  }, []);
  
    useEffect(() => {
      OneSignal.init({
        appId: "dd8d9c1d-7da4-4aa3-800e-bd5ebe075063",
      });

      OneSignal.User.PushSubscription.addEventListener(
        "change",
        (changeEvent) => {
      setValues({ ...values, deviceId: changeEvent.current.id});
        }
      );
    }, []);

  return (
    <div className="container-agendamentos" ref={containerRef}>
      {buttomMeusAgendamentos && (
        <div className="button-meus-agendamentos-contain">
          <button
            onClick={() => {
              resetStates();
              navigate("/");
            }}
            className="custom-button"
          >
            <img src={arrow} alt="arrow" className="button-image" />
          </button>
          <button
            className="button-meus-agendamentos-header"
            onClick={() => navigate("/meus-agendamentos")}
          >
            Meus agendamento
          </button>
        </div>
      )}
      {!name && <div>{<Introduction />}</div>}

      <div>
        {isName && <div>{<Welcome />}</div>}
        {isServices && (
          <section
            className={
              msgServices ? "section-mensagem " : "section-mensagem msg-bottom"
            }
          >
            <section>{<Services />}</section>
          </section>
        )}
      </div>
      {isServicesSelected && msgServices && (
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
      {!isAgendamentos && (
        <div>
          {isDates && (
            <section className={selectedDate ? "" : "msg-bottom"}>
              {<Calendar />}
            </section>
          )}
          {selectedDate && (
            <div className="hours">
              <section className={isAgendamentos ? "" : "msg-bottom"}>
                {<AppointmentTimes />}
              </section>
            </div>
          )}
        </div>
      )}
      {isAgendamentos && (
        <div className="section-mensagem-usuario">
          <section
            className={isPhone ? "section-name" : "section-name msg-bottom "}
          >
            {agendamentos}
          </section>
        </div>
      )}
      {isPhone && (
        <div>
          <section
            className={
              phoneBottom ? "section-mensagem" : "section-mensagem msg-bottom"
            }
          >
            {<MensagemPhone />}
          </section>
        </div>
      )}
      {phone && (
        <div className={phoneBottom ? "" : "msg-bottom"}>
          <section className="section-mensagem-usuario">
            <section className="section-name" style={{ padding: 0 }}>
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
      {!isMyAgendamentos && <FormsInput />}
      {canRender && <FormsButton />}
    </div>
  );
}
export default Agendamentos;
