import { useContext, useEffect, useState } from "react";
import ScheduleChart from "./ScheduleChart";
import {
  fetchAPiCount,
  fetchAPiCountCancel,
  fetchAPiCountFuture,
} from "../utils/fetchApi";
import SchedulePieChart from "./SchedulePieChart";
import '../styles/DashboardSchedule.css'
function DashboardSchedule() {
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
      console.log(agendamentos);
      
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
      <h2 className="title">Agendamentos</h2>
      <section className="chart-section" >
        <h3>
        Mudar o tipo do grafico:
        </h3>
        <div className="button-chart-contain">
          <button
            type="button"
            onClick={() => setChartType("bar")}
            className={
              chartType === "bar" ? "button-chart active" : "button-chart"
            }
          >
            Grafico de Barras
          </button>
          <button
            type="button"
            onClick={() => setChartType("pie")}
            className={
              chartType === "pie" ? "button-chart active" : "button-chart"
            }
          >
            Grafico de Pizza
          </button>
        </div>
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
      <section className="chart-section">
        <h3>Aplicar filtros :
        </h3>
        <div>
          <button type="button" onClick={() => setRagesDays(0)}
          className={ragesDays === 0 ? "button-filter active" : "button-filter"}
          >
            Todos
          </button>
          <button type="button" onClick={() => setRagesDays(7)}
          className={ragesDays === 7 ? "button-filter active" : "button-filter"}
          >
            Últimos 7 dias
          </button>
          <button type="button" onClick={() => setRagesDays(30)}
          className={ragesDays === 30 ? "button-filter active" : "button-filter"}
          >
            Últimos 30 dias
          </button>
          <button type="button" onClick={() => setRagesDays(90)}
          className={ragesDays === 90 ? "button-filter active" : "button-filter"}
          >
            Últimos 90 dias
          </button>
          <button type="button" onClick={() => setRagesDays(180)}
          className={ragesDays === 180 ? "button-filter active" : "button-filter"}
          >
            Últimos 180 dias
          </button>
          <button type="button" onClick={() => setRagesDays(365)}
          className={ragesDays === 365 ? "button-filter active" : "button-filter"}
          >
            Último ano
          </button>
        </div>
      </section>
    </div>
  );
}
export default DashboardSchedule;
