import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import "../styles/barberDashboardCalendar.css";
import {
  fetchApiCreateDayOff,
  fetchApiDeleteDayOff,
} from "../utils/fetchApi";
import ButtonOffDayCalendar from "./ButtonOffDayCalendar";
import CalendarGrid from "./CalendarGrid";
import SchedulesDashboard from "./schedulesDashboard";
import AgendamentosContext from "../context/AgendamentosContext";

dayjs.locale("pt-br");

function BarberDashboardUser() {
  const {
    currentYear,
    currentMonth,
    offDays,
    setSelectedOffDays,
    setOffDays,
    isOffDay,
    selectedDay,
    setSelectedDay,
    setSelectedOffDay,
    selectedOffDay,
    cancellationCandidate,
    setCancellationCandidate,
    setIsOffDaySelected,
    setConfirmOffDay,
    isRecurrentClient,
  } = useContext(AgendamentosContext);

  const [deleteOffDay, setDeleteOffDay] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const cancelOffDay = async () => {
    if (cancellationCandidate) {
      setLoading(true);
      const data = await fetchApiDeleteDayOff(cancellationCandidate, token);
      if (data) {
        setDeleteOffDay(data);
        setLoading(false);
      }
      const selectedOffDayCancelled = offDays.filter(
        (offDay) => offDay.selectedDate !== cancellationCandidate
      );
      setOffDays(selectedOffDayCancelled);
      setCancellationCandidate(null); // Limpa a candidata a cancelamento após o cancelamento
      localStorage.setItem("offDays", JSON.stringify(selectedOffDayCancelled));

      setTimeout(() => {
        setDeleteOffDay("");
      }, 5000);
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

    // Atualiza ou adiciona o dia de folga com o tipo selecionado.
    setSelectedOffDay((prevOffDays) => {
      // Encontrar índice do dia atual se existir
      const existingIndex = prevOffDays.findIndex(
        (offDay) => offDay.selectedDate === dateString
      );

      // Se já existe um OffDay para esta data, apenas atualize o tipo.
      if (existingIndex !== -1) {
        return prevOffDays.map((offDay, index) =>
          index === existingIndex ? { ...offDay, timeOff: timeOffType } : offDay
        );
      } else {
        // Se estiver no modo de dia de folga único, substitua quaisquer dias de folga existentes.
        if (isOffDay) {
          return [{ selectedDate: dateString, timeOff: timeOffType }];
        }
        // Caso contrário, adicione o novo dia de folga à lista.
        return [
          ...prevOffDays,
          { selectedDate: dateString, timeOff: timeOffType },
        ];
      }
    });
  };

  // Função para confirmar os dias de folga selecionados
  const confirmSelectedOffDays = async () => {
    setLoading(true);
    const data = await fetchApiCreateDayOff(selectedOffDay, token);

    setOffDays([...offDays, ...selectedOffDay]);
    localStorage.setItem(
      "offDays",
      JSON.stringify([...offDays, ...selectedOffDay])
    );
    setSelectedOffDays({});
    setSelectedDay(null);
    setSelectedOffDay([]);
    setIsOffDaySelected(false);
    setConfirmOffDay(false);
    setDeleteOffDay(data);
    if (data) {
      setLoading(false);
      setDeleteOffDay("");
    }
  };

  const handleAddOffDay = (
    timeOffType: "morning" | "afternoon" | "full-day"
  ) => {
    if (selectedDay !== null) {
      // Certifique-se de que um dia está selecionado
      const dateString = dayjs(
        new Date(currentYear, currentMonth, selectedDay)
      ).format("MM/DD/YYYY");

      // Verifique se o dia selecionado já está marcado com o mesmo tipo de folga.
      const isAlreadyOff = selectedOffDay.some(
        (offDay) =>
          offDay.selectedDate === dateString && offDay.timeOff === timeOffType
      );

      if (isAlreadyOff) {
        // Se for o mesmo tipo de dia de folga, resete o estado para remover a seleção.
        setSelectedOffDay(
          selectedOffDay.filter((offDay) => offDay.selectedDate !== dateString)
        );
      } else {
        // Caso contrário, adicione ou atualize o dia de folga.
        addOffDay(selectedDay, timeOffType);
      }
    }
  };


  return (
    <>
      <div className="title-contain">
        <div className="option-one">
          {isOffDay && <p className="paragraph">Selecione o dia de folga: </p>}
          {isRecurrentClient && (
            <p className="paragraph ">
              Escolha o dia para realizar o agendamento:
            </p>
          )}
        </div>
          <CalendarGrid />
      </div>
      <div>
        {isOffDay && (
          <ButtonOffDayCalendar
            handleAddOffDay={handleAddOffDay}
            confirmSelectedOffDays={confirmSelectedOffDays}
            cancelOffDay={cancelOffDay}
            deleteOffDay={deleteOffDay}
            loading={loading}
          />
        )}
        {isRecurrentClient && <SchedulesDashboard />}
      </div>
    </>
  );
}

export default BarberDashboardUser;
