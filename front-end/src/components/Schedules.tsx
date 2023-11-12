import React from "react";
import CalendarGrid from "./CalendarGrid";
import ScheduleCard from "./ScheduleCard";

function Schedules() {
  return (
    <div className="container-card">
      <p className="paragraph">Escolha o dia para ver os agendamentos</p>
      <div className="barber-schedule">
        <CalendarGrid />
      </div>
      <button className="button-calendar button-typed-off-day fade-button1 button-card">
        Ver Todos
      </button>
      <>
        <ScheduleCard />
      </>
    </div>
  );
}
export default Schedules;
