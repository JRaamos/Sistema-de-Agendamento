import React from 'react'
import { ChartType } from '../types/Chart';

function DashboardChartType({ chartType, setChartType}: ChartType) {
  return (
    <section className="chart-section">
      <h3>Mudar o tipo do grafico:</h3>
      <div className="button-chart-contain">
        <button
          type="button"
          onClick={() => setChartType("bar")}
          className={
            chartType === "bar" ? "button-chart actived" : "button-chart"
          }
        >
          Grafico de Barras
        </button>
        <button
          type="button"
          onClick={() => setChartType("pie")}
          className={
            chartType === "pie" ? "button-chart actived" : "button-chart"
          }
        >
          Grafico de Pizza
        </button>
      </div>
    </section>
  );
}

export default DashboardChartType