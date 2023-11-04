import { useContext, useEffect, useState } from "react";
import ScheduleChart from "./ScheduleChart";
import AgendamentosContext from "../context/AgendamentosContext";
import { fetchAPiCount, fetchAPiCountCancel, fetchAPiCountFuture } from "../utils/fetchApi";
function DashboardAgendamentos() {

  const { setScheduleData, setCancelationsData, setFutureSchedulesData } =
    useContext(AgendamentosContext);
const [ragesDays, setRagesDays] = useState(0);
const token = localStorage.getItem("token");



  useEffect(() => {
    async function loadData() {
      const agendamentos = await fetchAPiCount(
        ragesDays === 0 ? "all" : ragesDays,
        token
      );
      const cancelamentos = await fetchAPiCountCancel(
        ragesDays === 0 ? "all" : ragesDays,
        token
      );
      const futureSchedules = await fetchAPiCountFuture(token);

      setScheduleData(agendamentos.result);
      setCancelationsData(cancelamentos.result);
      setFutureSchedulesData(futureSchedules.result);
    }

    loadData();
  }, [token, ragesDays]);

  return (
    <div>
      <h2>Agendamentos</h2>
      <section>
        <ScheduleChart  />
      </section>
    </div>
  );
}
export default DashboardAgendamentos;