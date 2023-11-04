import React from "react";

const CalendarNavigation = ({
  goToPreviousMonth,
  goToNextMonth,
  monthName,
  yearName,
}) => {
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
