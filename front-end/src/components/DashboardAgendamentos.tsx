import { useContext, useEffect, useState } from "react";
import ScheduleChart from "./ScheduleChart";
import AgendamentosContext from "../context/AgendamentosContext";
import {
  fetchAPiCount,
  fetchAPiCountCancel,
  fetchAPiCountFuture,
} from "../utils/fetchApi";
import SchedulePieChart from "./SchedulePieChart";
function DashboardAgendamentos() {
  const [ragesDays, setRagesDays] = useState(0);
  const [chartType, setChartType] = useState("bar");
  const [scheduleData, setScheduleData] = useState<number | null>(0);
  const [cancellationsData, setCancelationsData] = useState<number | null>(0);
  const [futureSchedulesData, setFutureSchedulesData] = useState<number | null>(
    0
  );
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function loadData() {
      const agendamentos = await fetchAPiCount(
        ragesDays === 0 ? "all" : ragesDays,
        token
      );
      const cancelamentos = await fetchAPiCountCancel(ragesDays, token);
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
        Mudar grafico
        <button type="button" onClick={() => setChartType("bar")}>
          Grafico de Barras
        </button>
        <button type="button" onClick={() => setChartType("pie")}>
          Grafico de Pizza
        </button>
      </section>
      {chartType === "bar" ? (
        <ScheduleChart
          scheduleData={scheduleData}
          cancellationsData={cancellationsData}
          futureSchedulesData={futureSchedulesData}
        />
      ) : (
        <SchedulePieChart
          scheduleData={scheduleData}
          cancellationsData={cancellationsData}
          futureSchedulesData={futureSchedulesData}
        />
      )}
      <section>
        <h3>Filtros</h3>
        <div>
          <button type="button" onClick={() => setRagesDays(0)}>
            Todos
          </button>
          <button type="button" onClick={() => setRagesDays(7)}>
            Últimos 7 dias
          </button>
          <button type="button" onClick={() => setRagesDays(30)}>
            Últimos 30 dias
          </button>
          <button type="button" onClick={() => setRagesDays(90)}>
            Últimos 90 dias
          </button>
          <button type="button" onClick={() => setRagesDays(180)}>
            Últimos 180 dias
          </button>
          <button type="button" onClick={() => setRagesDays(365)}>
            Últimos 365 dias
          </button>
        </div>
      </section>
    </div>
  );
}
export default DashboardAgendamentos;
