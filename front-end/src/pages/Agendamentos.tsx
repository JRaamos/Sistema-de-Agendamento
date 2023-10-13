import React, { useContext, useEffect, useState } from "react";
import "../styles/agendamentos.css";
import Services from "../components/Services";
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

function Agendamentos() {
  const {
    isServices,
    isDate,
    phone,
    servicesSelected,
    isAgendamentos,
    isName,
    isServicesSelected,
    selectedDate,
    phoneBottom,
    isPhone,
    isMyAgendamentos,
    isDates,
    agendamentos,
  }: any = useContext(AgendamentosContext);

  return (
    <div className="container-agendamentos">
      <div>{<Introduction />}</div>

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
      {!isMyAgendamentos && <FormsInput />}
      {isMyAgendamentos && <FormsButton />}
    </div>
  );
}
export default Agendamentos;
