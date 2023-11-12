import React from "react";
import CalendarGrid from "./CalendarGrid";
import ScheduleCard from "./ScheduleCard";

function Schedules() {
  return (
    <div>
      <p className="paragraph">Escolha o dia para ver os agendamentos</p>
      <button className="button-calendar button-typed-off-day fade-button1">
        Ver Todos
      </button>
      <div className="barber-schedule">
        <CalendarGrid />
      </div>
      <div>
        <ScheduleCard />
      </div>
    </div>
  );
}
export default Schedules;
