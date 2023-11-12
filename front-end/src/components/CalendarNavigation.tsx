// CalendarNavigation.js
import React from "react";
import dayjs from "dayjs";
import { CalendarNavigationProps } from "../types/dashboard";



const CalendarNavigation = ({
  currentYear,
  currentMonth,
  goToPreviousMonth,
  goToNextMonth,
}: CalendarNavigationProps) => {
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
