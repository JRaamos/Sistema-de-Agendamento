import React from "react";
import { ChartRagesDay } from "../types/Chart";

function DashboardFilter({ setRagesDays, ragesDays }: ChartRagesDay) {
  return (
    <section className="chart-section">
      <h3>Aplicar filtros :</h3>
      <div>
        <button
          type="button"
          onClick={() => setRagesDays(0)}
          className={
            ragesDays === 0 ? "button-filter actived" : "button-filter"
          }
        >
          Todos
        </button>
        <button
          type="button"
          onClick={() => setRagesDays(7)}
          className={
            ragesDays === 7 ? "button-filter actived" : "button-filter"
          }
        >
          Últimos 7 dias
        </button>
        <button
          type="button"
          onClick={() => setRagesDays(30)}
          className={
            ragesDays === 30 ? "button-filter actived" : "button-filter"
          }
        >
          Últimos 30 dias
        </button>
        <button
          type="button"
          onClick={() => setRagesDays(90)}
          className={
            ragesDays === 90 ? "button-filter actived" : "button-filter"
          }
        >
          Últimos 90 dias
        </button>
        <button
          type="button"
          onClick={() => setRagesDays(180)}
          className={
            ragesDays === 180 ? "button-filter actived" : "button-filter"
          }
        >
          Últimos 180 dias
        </button>
        <button
          type="button"
          onClick={() => setRagesDays(365)}
          className={
            ragesDays === 365 ? "button-filter actived" : "button-filter"
          }
        >
          Último ano
        </button>
      </div>
    </section>
  );
}
export default DashboardFilter;
