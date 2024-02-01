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
import { useNavigate } from "react-router-dom";
function DashboardScheduleChart() {
  const [ragesDays, setRagesDays] = useState(0);
  const [chartType, setChartType] = useState("bar");
  const [scheduleData, setScheduleData] = useState<number | null>(0);
  const [cancellationsData, setCancelationsData] = useState<number | null>(0);
  const [futureSchedulesData, setFutureSchedulesData] = useState<number | null>(
    0
  );
  const [istoken, setIstoken] = useState(false);
  const navigation = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigation("/login");
    } else {
      setIstoken(true);
    }
  }, [history]);

  useEffect(() => {
    async function loadData() {
      const agendamentos = await fetchAPiCount(ragesDays, token);

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
      {token && (
        <div>
          <DashboardChartType
            chartType={chartType}
            setChartType={setChartType}
          />

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
      )}
    </div>
  );
}
export default DashboardScheduleChart;
