// CalendarNavigation.js
import React, { useContext } from "react";
import dayjs from "dayjs";
import AgendamentosContext from "../context/AgendamentosContext";

const CalendarNavigation = () => {
  const { currentYear, currentMonth, setCurrentMonth, setCurrentYear } =
    useContext(AgendamentosContext);
  const goToPreviousMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    if (currentMonth === 0) {
      setCurrentYear((prevYear) => prevYear - 1);
    }
  };

  const goToNextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    if (currentMonth === 11) {
      setCurrentYear((prevYear) => prevYear + 1);
    }
  };
  const monthName = dayjs(new Date(currentYear, currentMonth)).format("MMMM");
  const yearName = dayjs(new Date(currentYear, currentMonth)).format("YYYY");

  return (
    <div className="calendar-navigation">
      <button onClick={goToPreviousMonth} className="button-calendar">
        Anterior
      </button>
      <span>{`${monthName} ${yearName}`}</span>
      <button onClick={goToNextMonth} className="button-calendar">
        Próximo
      </button>
    </div>
  );
};

export default CalendarNavigation;
