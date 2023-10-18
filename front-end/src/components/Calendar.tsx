import React, { useContext, useEffect, useState } from "react";
import { format, addDays } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import "../styles/calendar.css";
import AgendamentosContext from "../context/AgendamentosContext";
import { DateList } from "../types/Calendar";

const Calendar = () => {
  const { selectedDate, setSelectedDate, values, setValues } =
    useContext(AgendamentosContext);
  const currentDate = new Date();
  const [dates, setDates] = useState<DateList[]>([]);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const dayAbbreviations = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const dateList = [];

    for (let i = 0; i <= 30; i += 1) {
      const date = addDays(currentDate, i);
      const dayIndex = date.getDay();
      const formattedDateName = dayAbbreviations[dayIndex];
      const formattedDate = format(date, "MM/dd/yyyy", {
        locale: ptBR,
      });

      dateList.push({ dayName: formattedDateName, date: formattedDate });
    }

    setDates(dateList);
  }, []);

  const handleButtonClick = (dayInfo: string) => {
    setSelectedDate(dayInfo);
    setIsSelected(true);
    setValues({ ...values, date: dayInfo });
  };

  return (
    <div className="date-container">
      {dates.map((dateInfo, index) => (
        <button
          key={index}
          className={
            isSelected && selectedDate === dateInfo.date
              ? "selected-date"
              : "dateInfor-container"
          }
          onClick={() => handleButtonClick(dateInfo.date)}
        >
          <div className="rool">
            <div className="dayName">{dateInfo.dayName}</div>
            <div className="dateInfor">{dateInfo.date.split("/")[1]}</div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default Calendar;
