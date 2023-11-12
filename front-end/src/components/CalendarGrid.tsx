// CalendarGrid.js
import React, { useContext } from "react";
import dayjs from "dayjs";
import { DayOff } from "../types/AgendamentosProvider";

interface CalendarGridProps {
  currentYear: number;
  currentMonth: number;
  offDays: DayOff[];
  selectedOffDays: {
    [key: string]: string;
  };
  toggleOffDay: (day: number) => void;
  setCancellationCandidate: (date: null | string) => void;
  setSelectedOffDays: (selectedOffDays: { [key: string]: string }) => void;
  setIsOffDaySelected: (isOffDaySelected: boolean) => void;
  isRecurrentClient: boolean;
  setConfirmOffDay: (confirmOffDay: boolean) => void;
}

const CalendarGrid = ({
  currentYear,
  currentMonth,
  offDays,
  selectedOffDays,
  toggleOffDay,
  setCancellationCandidate,
  setSelectedOffDays,
  setIsOffDaySelected,
  isRecurrentClient,
  setConfirmOffDay,
}: CalendarGridProps) => {
  const handleCancelationsConditions = (isOffDay: boolean) => {
    if (!isOffDay) {
      setCancellationCandidate(null);
    } else {
      setSelectedOffDays({});
    }
  };
  const renderCalendarDays = () => {
    const startDayOfMonth = dayjs(new Date(currentYear, currentMonth))
      .startOf("month")
      .day();
    const daysInMonth = dayjs(
      new Date(currentYear, currentMonth)
    ).daysInMonth();

    let days = [];
    for (let i = 1; i <= startDayOfMonth; i++) {
      days.push(<div key={`empty-start-${i}`} className="calendar-day" />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dateString = dayjs(new Date(currentYear, currentMonth, i)).format(
        "MM/DD/YYYY"
      );
      const isOffDay = offDays.some(
        (offDay: DayOff) => offDay.selectedDate === dateString
      ); // Verifica se a data está em offDays
      const isSelected = selectedOffDays[dateString] === "selected"; // Verifica se a data está em selectedOffDays como 'selected'

      const offDayClass = isOffDay
        ? "selected off-day"
        : isSelected
        ? "selected"
        : "day-on";
      days.push(
        <div
          key={`day-${i}`}
          className={`calendar-day ${offDayClass}`}
          onClick={() => {
            toggleOffDay(i);
            setConfirmOffDay(true);
            if (isOffDay) {
              handleCancelationsConditions(isOffDay);
            }
            if (isRecurrentClient) {
              setIsOffDaySelected(true);
            }
          }}
        >
          {i}
        </div>
      );
    }

    const totalSlots = daysInMonth + startDayOfMonth;
    const nextSlots = totalSlots % 7 === 0 ? 0 : 7 - (totalSlots % 7);
    for (let i = 1; i <= nextSlots; i++) {
      days.push(<div key={`empty-end-${i}`} className="calendar-day " />);
    }

    return days;
  };

  return (
    <div className="calendar-contain fade-in">
      <div className="calendar-header">
        <div>Dom</div>
        <div>Seg</div>
        <div>Ter</div>
        <div>Qua</div>
        <div>Qui</div>
        <div>Sex</div>
        <div>Sáb</div>
      </div>
      <div className="calendar-grid fade-in">{renderCalendarDays()}</div>
    </div>
  );
};

export default CalendarGrid;
