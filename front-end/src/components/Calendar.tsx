import React, { useEffect, useState } from "react";
import { format, addDays } from "date-fns";
import ptBR from "date-fns/locale/pt-BR"; // Importe a localização pt-BR

const Calendar = () => {
  const currentDate = new Date();
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const dayAbbreviations = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const dateList = [];

    for (let i = 0; i < 30; i += 1) {
      const date = addDays(currentDate, i);
      const dayIndex = date.getDay();
      const formattedDateName = dayAbbreviations[dayIndex];
      const formattedDate = format(date, "dd", {
        locale: ptBR,
      });

      dateList.push({ dayName: formattedDateName, date: formattedDate });
    }

    setDates(dateList);
  }, []);

  return (
    <div>
      {dates.map((dateInfo, index) => (
        <div key={index}>
          <div>{dateInfo.dayName}</div>
          <div>{dateInfo.date}</div>
        </div>
      ))}
    </div>
  );
};

export default Calendar;
