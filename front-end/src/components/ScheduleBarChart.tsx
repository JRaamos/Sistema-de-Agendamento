import React from "react";

import { Bar } from "react-chartjs-2";
import "../styles/ScheduleChart.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { ChartProps } from "../types/Chart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

function ScheduleBarChart({
  scheduleData,
  cancellationsData,
  futureSchedulesData,
}: ChartProps) {
  const data = {
    labels: [`realizados`, "cancelados", "futuros"],
    datasets: [
      {
        data: [scheduleData, cancellationsData, futureSchedulesData],
        backgroundColor: [
          "rgba(0, 128, 0, 0.2)", // Verde mais forte
          "rgba(255, 99, 132, 0.2)", // Vermelho
          "rgba(255, 206, 86, 0.2)", // Amarelo
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)", // Verde
          "rgba(255, 99, 132, 1)", // Vermelho
          "rgba(255, 206, 86, 1)", // Amarelo
        ],
        borderWidth: 1.5,
      },
    ],
  };

  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
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
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        type: "category",
        ticks: {
          color: "#fff",
          font: {
            size: 15,
          },
        },
      },
      y: {
        type: "linear",
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: {
            size: 15,
          },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
}

export default ScheduleBarChart;
