import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import "../styles/barberDashboardCalendar.css";
import { fetchApiCreateDayOff } from "../utils/fetchApi";
import ButtonOffDayCalendar from "./ButtonOffDayCalendar";
import CalendarNavigation from "./CalendarNavigation";
import CalendarGrid from "./CalendarGrid";
import { is } from "date-fns/locale";

dayjs.locale("pt-br"); // Defina o local globalmente
type OffDay = {
  selectedDate: string;
  timeOff: "morning" | "afternoon" | "full-day";
};

function BarberDashboardUser() {
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
  const [isOffDay, setIsOffDay] = useState<boolean>(false);

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
        (offDay) => offDay.selectedDate !== cancellationCandidate
      );
      setOffDays(selectedOffDayCancelled);
      setCancellationCandidate(null); // Limpa a candidata a cancelamento após o cancelamento
      localStorage.setItem("offDays", JSON.stringify(selectedOffDayCancelled));
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
  useEffect(() => {
    const offDays = localStorage.getItem("offDays");
    if (offDays) {
      setOffDays(JSON.parse(offDays));
    }
  }, []);

  return (
    <>
      <h2>O que você quer faze? </h2>
      <div>
        <button
          onClick={() => {
            setSelectedOffDays({});
            setSelectedDay(null); 
            setSelectedOffDay([]);
            setIsOffDay(!isOffDay);
            setCancellationCandidate(null);
          }}
        >
          Definir dia de folga
        </button>
        <button
          onClick={() => {
            setSelectedOffDays({});
            setSelectedDay(null); 
            setSelectedOffDay([]);
            setIsOffDay(false);
          }}
        >
          Agendar cliente recorrente
        </button>
      </div>
      <div className="barber-schedule">
        {isOffDay && <p>Selecione o dia de folga</p>}
        <CalendarNavigation
          currentYear={currentYear}
          currentMonth={currentMonth}
          goToPreviousMonth={goToPreviousMonth}
          goToNextMonth={goToNextMonth}
        />
        <CalendarGrid
          currentYear={currentYear}
          currentMonth={currentMonth}
          offDays={offDays}
          selectedOffDays={selectedOffDays}
          toggleOffDay={toggleOffDay}
          setCancellationCandidate={setCancellationCandidate}
          setSelectedOffDays={setSelectedOffDays}
          cancellationCandidate={cancellationCandidate}
          isOffDay={isOffDay}
        />
      </div>
      <div>
        {isOffDay && (
          <ButtonOffDayCalendar
            handleAddOffDay={handleAddOffDay}
            confirmSelectedOffDays={confirmSelectedOffDays}
            cancelOffDay={cancelOffDay}
            cancellationCandidate={cancellationCandidate}
            selectedOffDays={selectedOffDays}
            toggleOffDay={toggleOffDay}
          />
        )}
      </div>
    </>
  );
}

export default BarberDashboardUser;
