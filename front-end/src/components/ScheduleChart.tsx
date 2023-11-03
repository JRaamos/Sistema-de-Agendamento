import React, { useState, useEffect } from "react";
import { fetchAPiCount, fetchAPiCountCancel } from "../utils/fetchApi";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ScheduleChart({ token, days }) {
  const [agendamentosData, setAgendamentosData] = useState([]);
  const [cancelamentosData, setCancelamentosData] = useState([]);

  useEffect(() => {
    async function loadData() {
        const agendamentos = await fetchAPiCount(days, token);
        const cancelamentos = await fetchAPiCountCancel(days, token);
        setAgendamentosData(agendamentos.result);
        setCancelamentosData(cancelamentos.result); 
    }

    loadData();
  }, [token, days]);

  const data = {
    labels: ["Agendamentos realizados", " Agendamentos cancelados"],
    datasets: [
      {
        label: "Total",
        data: [agendamentosData, cancelamentosData],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1.5,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default ScheduleChart;