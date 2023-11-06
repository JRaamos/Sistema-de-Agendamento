import { useContext, useEffect, useState } from "react";
import {
  fetchAPiCount,
  fetchAPiCountCancel,
  fetchAPiCountFuture,
} from "../utils/fetchApi";
import SchedulePieChart from "./SchedulePieChart";
import "../styles/DashboardSchedule.css";
import ScheduleBarChart from "./ScheduleBarChart";
import DashboardFilter from "./DashboardFilter";
import DashboardChartType from "./DashboardChartType";
function DashboardScheduleChart() {
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
      <h2 className="title">Agendamentos</h2>
      <DashboardChartType chartType={chartType} setChartType={setChartType} />

      {chartType === "bar" ? (
        <ScheduleBarChart
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

      <DashboardFilter setRagesDays={setRagesDays} ragesDays={ragesDays} />
    </div>
  );
}
export default DashboardScheduleChart;
