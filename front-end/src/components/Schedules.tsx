import React, { useContext } from "react";
import CalendarGrid from "./CalendarGrid";
import ScheduleCard from "./ScheduleCard";
import AgendamentosContext from "../context/AgendamentosContext";
import { fetchAPiGetAll } from "../utils/fetchApi";

function Schedules() {
  const {  setSchedules } =
    useContext(AgendamentosContext);
  const handleFindAllSchedule = async () => {
    const response = await fetchAPiGetAll();;
    setSchedules(response);
  };
  return (
    <div className="container-card">
      <p className="paragraph">Escolha o dia para ver os agendamentos</p>
        <CalendarGrid />
      <button
        type="button"
        onClick={handleFindAllSchedule}
        className="button-calendar button-typed-off-day fade-button1 button-card"
      >
        Ver Todos
      </button>
      <>
        <ScheduleCard />
      </>
    </div>
  );
}
export default Schedules;
