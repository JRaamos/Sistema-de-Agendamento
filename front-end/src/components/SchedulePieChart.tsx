import React from "react";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PieController,
  ChartOptions,
} from "chart.js";
import { ChartProps } from "../types/Chart";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PieController
);
function SchedulePieChart({ scheduleData, cancellationsData, futureSchedulesData }: ChartProps ) {

  const data = {
    labels: ["Realizados", "Cancelados", "Futuros"],
    datasets: [
      {
        data: [scheduleData, cancellationsData, futureSchedulesData],
        backgroundColor: [
          "rgba(0, 128, 0, 0.6)", // Verde
          "rgba(255, 99, 132, 0.6)", // Vermelho
          "rgba(255, 206, 86, 0.6)", // Amarelo
        ],
        borderColor: [
          "rgba(0, 128, 0, 1)", // Verde
          "rgba(255, 99, 132, 1)", // Vermelho
          "rgba(255, 206, 86, 1)", // Amarelo
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        align: "center" as const,
        labels: {
          boxWidth: 20,
          padding: 20,
          color: "white",
        },
      },
      title: {
        display: true,
        text: "Distribuição de Agendamentos",
        color: "#fff",
        font: {
          size: 18,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Pie data={data} options={options} />
    </div>
  );
}

export default SchedulePieChart;
