import React, { useContext, useEffect, useState } from "react";
import AgendamentosContext from "../context/AgendamentosContext";
import { fetchAPiCancel, fetchAPiGet } from "../utils/fetchApi";
import "../styles/scheduleCard.css";
import { FetchAPiGet, ServiceApi } from "../types/ApiReturn";
import { convertDateFormat } from "../utils/functionsFormatDate";
import dayjs from "dayjs";
import Loading from "./Loading";

function ScheduleCard() {
  const { selectedOffDays, schedules, setSchedules } =
    useContext(AgendamentosContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleApi = async () => {
      const dates = Object.keys(selectedOffDays);
      const data = dates.map(async (date) => {
        const response = await fetchAPiGet(date);        
        return response;
      });
      const schedulesAll = await Promise.all(data);
      setSchedules(schedulesAll[0]);
    };

    handleApi();
  }, [selectedOffDays, loading]);

  // Função para formatar a string de serviços
  const formatServices = (services: ServiceApi[]) => {
    return services
      .map((service, index, array) =>
        index === array.length - 1 && array.length > 1
          ? `e ${service.service}`
          : service.service
      )
      .join(", ");
  };
  const cancelSchedule = async (date: string, hour: string) => {
    const day = dayjs(date).format("YYYY-MM-DD");
    setLoading(true);
    const response = await fetchAPiCancel(day, hour);    
    setLoading(false);
  };
  return (
    <>
      <p className="paragraph title-card">Agendamentos</p>
      <div className="div-card">
        {loading ? (
          <Loading />
        ) : (
          <>
          {
            schedules?.length === 0 && <p>Não há agendamentos para esse dia</p>
          }
            {schedules?.map((schedule) => {
              return (
                <div
                  key={schedule.scheduleId}
                  className="card-contain  fade-button1"
                >
                  <div>
                    <p className="paragraph-card">
                      Nome do cliente: {schedule.user.name}
                    </p>
                    <p className="paragraph-card">
                      Telefone: {schedule.user.phone}
                    </p>
                    <p className="paragraph-card">
                      Data do agendamento: {convertDateFormat(schedule.date)}
                    </p>
                    <p className="paragraph-card">
                      Hora do agendamento: {schedule.hour}
                    </p>
                    <p className="paragraph-card">
                      Serviços: {formatServices(schedule.services)}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="button-calendar"
                    onClick={() => {
                      cancelSchedule(schedule.date, schedule.hour);
                    }}
                  >
                    cancelar
                  </button>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}
export default ScheduleCard;
