import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import "../styles/barberDashboardCalendar.css";
import { fetchApiCreateDayOff } from "../utils/fetchApi";

dayjs.locale("pt-br"); // Defina o local globalmente
type OffDay = {
  selectedDate: string;
  timeOff: "morning" | "afternoon" | "full-day";
};

function BarberDashboardCalendar() {
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const [offDays, setOffDays] = useState<OffDay[]>([]);
  const [selectedOffDay, setSelectedOffDay] = useState<OffDay[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedOffDays, setSelectedOffDays] = useState<{
    [key: string]: string;
  }>({});
  const [cancellationCandidate, setCancellationCandidate] = useState<
    string | null
  >(null);
const token = localStorage.getItem("token");
  const prepareCancellation = (day: number) => {
    const dateString = dayjs(new Date(currentYear, currentMonth, day)).format(
      "MM/DD/YYYY"
    );
    setCancellationCandidate(dateString);
  };

  const cancelOffDay = () => {
    if (cancellationCandidate) {
      const selectedOffDayCancelled = offDays.filter(
          (offDay) => offDay.selectedDate !== cancellationCandidate)
      setOffDays(selectedOffDayCancelled);
      setCancellationCandidate(null); // Limpa a candidata a cancelamento após o cancelamento
      localStorage.setItem(
        "offDays",
        JSON.stringify(selectedOffDayCancelled)
      );
    }
  };
  // Função para alternar o estado de um dia selecionado
  const toggleOffDay = (day: number) => {
    const dateString = dayjs(new Date(currentYear, currentMonth, day)).format(
      "MM/DD/YYYY"
    );
    if (offDays.some((offDay) => offDay.selectedDate === dateString)) {
      prepareCancellation(day); // Prepara para cancelar um dia de folga existente
    } else {
      setSelectedDay(day);
      setSelectedOffDays((prevSelectedDays) => {
        const newSelectedDays = { ...prevSelectedDays };
        if (newSelectedDays[dateString]) {
          delete newSelectedDays[dateString];
        } else {
          newSelectedDays[dateString] = "selected";
        }
        return newSelectedDays;
      });
    }
  };

  // Função para adicionar um dia de folga
  const addOffDay = (
    day: number,
    timeOffType: "morning" | "afternoon" | "full-day" = "full-day"
  ) => {
    const dateString = dayjs(new Date(currentYear, currentMonth, day)).format(
      "MM/DD/YYYY"
    );
    setSelectedOffDay((prevOffDays) => {
      const existingOffDay = prevOffDays.find(
        (offDay) => offDay.selectedDate === dateString
      );
      if (existingOffDay && existingOffDay.timeOff === timeOffType) {
        return prevOffDays.filter(
          (offDay) => offDay.selectedDate !== dateString
        );
      }
      return existingOffDay
        ? prevOffDays.map((offDay) =>
            offDay.selectedDate === dateString
              ? { ...offDay, timeOff: timeOffType }
              : offDay
          )
        : [...prevOffDays, { selectedDate: dateString, timeOff: timeOffType }];
    });
  };

  // Função para confirmar os dias de folga selecionados
  const confirmSelectedOffDays = async () => {
    
    await fetchApiCreateDayOff(selectedOffDay, token);

    setOffDays([...offDays, ...selectedOffDay]);
    localStorage.setItem(
      "offDays",
      JSON.stringify([...offDays, ...selectedOffDay])
    );
    setSelectedOffDays({});
    setSelectedDay(null); // Limpa o dia selecionado atualmente
    setSelectedOffDay([]); // Limpa os dias selecionados
  };


  const handleAddOffDay = (
    timeOffType: "morning" | "afternoon" | "full-day"
  ) => {
    if (selectedDay !== null) {
      // Certifique-se de que um dia está selecionado
      addOffDay(selectedDay, timeOffType);
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
        (offDay) => offDay.selectedDate === dateString
      ); // Verifica se a data está em offDays
      const isSelected = selectedOffDays[dateString] === "selected"; // Verifica se a data está em selectedOffDays como 'selected'

      const offDayClass = isOffDay
        ? "off-day"
        : isSelected
        ? "selected"
        : "day-on";
      days.push(
        <div
          key={`day-${i}`}
          className={`calendar-day ${offDayClass}`}
          onClick={() => toggleOffDay(i)}
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

  useEffect(() => {
    const offDays = localStorage.getItem("offDays");
    if (offDays) {
      setOffDays(JSON.parse(offDays));
    }
  } , []);
  return (
    <div className="barber-schedule">
      <div className="calendar-navigation">
        <button onClick={goToPreviousMonth} className="button-calendar">
          Anterior
        </button>
        <span>{`${monthName} ${yearName}`}</span>
        <button onClick={goToNextMonth} className="button-calendar">
          Próximo
        </button>
      </div>
      <div className="calendar-contain">
        <div className="calendar-header">
          <div>Dom</div>
          <div>Seg</div>
          <div>Ter</div>
          <div>Qua</div>
          <div>Qui</div>
          <div>Sex</div>
          <div>Sáb</div>
        </div>
        <div className="calendar-grid">{renderCalendarDays()}</div>
      </div>
      <div className="off-day-selection">
        <button onClick={() => handleAddOffDay("morning")}>
          Folgar pela manhã
        </button>
        <button onClick={() => handleAddOffDay("afternoon")}>
          Folgar pela tarde
        </button>
        <button onClick={() => handleAddOffDay("full-day")}>
          Folgar o dia todo
        </button>
      </div>
      <div className="confirm-off-days">
        <button
          onClick={() => {
            confirmSelectedOffDays();
          }}
        >
          Confirmar Dias de Folga
        </button>
        {cancellationCandidate && ( 
          <button onClick={cancelOffDay}>Cancelar Folga Selecionada</button>
        )}
      </div>
    </div>
  );
}

export default BarberDashboardCalendar;
