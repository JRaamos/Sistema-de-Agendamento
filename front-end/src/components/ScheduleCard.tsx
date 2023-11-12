import React, { useContext, useEffect, useState } from "react";
import AgendamentosContext from "../context/AgendamentosContext";
import { fetchAPiGet } from "../utils/fetchApi";
import { set } from "date-fns";
import { FetchAPiGet } from "../types/ApiReturn";

function ScheduleCard() {
  const { selectedOffDays } = useContext(AgendamentosContext);
  const [schedules, setSchedules] = useState<FetchAPiGet[]>();
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
  }, [selectedOffDays]);

  return (
    <div>
      <p className="paragraph">Agendamentos</p>
      <div>
        {schedules?.map((schedule) => {
          return (
            <div key={schedule.scheduleId}>
              <div>
                <p>{schedule.date}</p>
                <p>{schedule.hour}</p>
              </div>
              <div>
                {schedule.services.map((service, index) => {
                  return (
                    <div key={index}>
                      <p>{service.service}</p>
                    </div>
                  );
                })}
              </div>
              <div>
                <p>{schedule.user.name}</p>
                <p>{schedule.user.phone}</p>
              </div>
              <button>
                cancelar
              </button>
            </div>

          );
        })}
      </div>
    </div>
  );
}
export default ScheduleCard;
