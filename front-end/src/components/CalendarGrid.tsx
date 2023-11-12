// CalendarGrid.js
import React, { useContext } from "react";
import dayjs from "dayjs";
import { DayOff } from "../types/AgendamentosProvider";
import CalendarNavigation from "./CalendarNavigation";
import AgendamentosContext from "../context/AgendamentosContext";

const CalendarGrid = () => {
  const {
    currentYear,
    currentMonth,
    offDays,
    selectedOffDays,
    setSelectedOffDays,
    setSelectedDate,
    isOffDay,
    selectedDay,
    setSelectedDay,
    setSelectedOffDay,
    setTypeOffDay,
    setTypeOffDaySelected,
    setCancellationCandidate,
    setConfirmOffDay,
    isRecurrentClient,
    setIsOffDaySelected,
  } = useContext(AgendamentosContext);

  const prepareCancellation = (day: number) => {
    const dateString = dayjs(new Date(currentYear, currentMonth, day)).format(
      "MM/DD/YYYY"
    );
    setCancellationCandidate(dateString);
  };
  // Função para alternar o estado de um dia selecionado
  const toggleOffDay = (day: number) => {
    const dateString = dayjs(new Date(currentYear, currentMonth, day)).format(
      "MM/DD/YYYY"
    );

    if (offDays.some((offDay) => offDay.selectedDate === dateString)) {
      prepareCancellation(day);
      setCancellationCandidate(dateString);
    }
    setSelectedDate(dateString);
    // Se isOffDay for verdadeiro e um novo dia for selecionado, limpe o estado anterior
    if (isOffDay) {
      if (selectedDay !== day) {
        // Verifica se um novo dia foi clicado
        setSelectedOffDay([]);
        setSelectedDay(day); // Atualize o dia selecionado
        setTypeOffDay(false); // Reseta o estado para que um novo tipo possa ser definido
        setTypeOffDaySelected(""); // Limpa a seleção de tipo de dia de folga anterior
        // Agora defina os estados apenas para o novo dia selecionado
        setSelectedOffDays({ [dateString]: "selected" });
      } else {
        // Se o mesmo dia for clicado novamente, você pode optar por manter ou limpar os estados
        // Isso depende se você quer que um clique duplo em um dia desmarque ou não
      }
    } else {
      // Lógica para seleção múltipla se isOffDay for falso
      setSelectedOffDays((prevSelectedDays) => {
        const newSelectedDays = { ...prevSelectedDays };
        if (newSelectedDays[dateString]) {
          delete newSelectedDays[dateString]; // Desmarque se já estiver selecionado
        } else {
          newSelectedDays[dateString] = "selected"; // Selecione se não estiver
        }
        return newSelectedDays;
      });
    }
  };

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
      const currentDay = new Date(currentYear, currentMonth, i);
      const dateString = dayjs(currentDay).format("MM/DD/YYYY");
      const isToday = dayjs().isSame(dayjs(currentDay), "day");
      // const dateString = dayjs(new Date(currentYear, currentMonth, i)).format(
      //   "MM/DD/YYYY"
      // );
      const isOffDay = offDays.some(
        (offDay: DayOff) => offDay.selectedDate === dateString
      ); // Verifica se a data está em offDays
      const isSelected = selectedOffDays[dateString] === "selected"; // Verifica se a data está em selectedOffDays como 'selected'

      const dayClass = isOffDay
        ? "selected off-day"
        : isSelected
        ? "selected"
        : isToday
        ? "current-day"
        : "day-on";
      days.push(
        <div
          key={`day-${i}`}
          className={`calendar-day ${dayClass}`}
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
    <>
      <div className="calendar-contain fade-in barber-schedule">
        <CalendarNavigation />
        <div className="calendar-header">
          <div>Dom</div>
          <div>Seg</div>
          <div>Ter</div>
          <div>Qua</div>
          <div>Qui</div>
          <div>Sex</div>
          <div>Sáb</div>
        </div>
        <div className="calendar-grid fade-in ">{renderCalendarDays()}</div>
      </div>
      <div className="calendar-legend">
        <span className="legend-description folga">Dia de folga</span>
        <span className="legend-description selected">Selecionado</span>
        <span className="legend-description atual">Dia atual</span>
      </div>
    </>
  );
};

export default CalendarGrid;
