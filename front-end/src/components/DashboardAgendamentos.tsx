import { useState } from "react";
import ScheduleChart from "./ScheduleChart";

function DashboardAgendamentos() {
const [ragesDays, setRagesDays] = useState(0);
const token = localStorage.getItem("token");


  return (
    <div>
      <h2>Agendamentos</h2>
      <section>
        <ScheduleChart token={ token } 
        days={ ragesDays }  />
      </section>
    </div>
  );
}
export default DashboardAgendamentos;