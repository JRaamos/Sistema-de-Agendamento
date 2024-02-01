import React, { FC, useContext, useEffect, useState } from "react";
import moment from "moment-timezone";

import dayjs from "dayjs";
// import services from "../utils/services.json";
import "../styles/appointmentTimes.css";
import AgendamentosContext from "../context/AgendamentosContext";
import { fetchAPiGet, fetchAPiGetAllServices } from "../utils/fetchApi";
import { ServiceApi } from "../types/ApiReturn";

const AppointmentTimes = () => {
  const [selectedTimes, setSelectedTimes] = useState<any[]>([]);
  const [dayOffTimes, setDayOffTimes] = useState({
    morningOff: false,
    afternoonOff: false,
    fullDayOff: false,
  });

  const {
    servicesSelected,
    values,
    setValues,
    setDisableButton,
    setButtonEnviar,
    selectedDate,
    availableTimes,
    setAvailableTimes,
    barberUnavailability,
    services,
  } = useContext(AgendamentosContext);

  // Função para buscar os horários já agendados
  const getBookedTimes = async (date: string | null) => {
    const response = await fetchAPiGet(date);  
    return response.map((item) => {
      // Calcula a duração total de todos os serviços para este horário
      const totalDuration = item.services.reduce(
        (total: number, service: ServiceApi) => {
          return total + Number(service.duration);
        },
        0
      );

      return {
        hour: item.hour,
        totalDuration,
      };
    });
  };


  //verifica condições para disponibilizar os horários
  const calculateAvailableTimes = async () => {
    if (servicesSelected.length === 0 || !selectedDate) {
      setAvailableTimes([]);
      return;
    }
 if (moment(selectedDate).isBefore(moment().startOf("day"))) {
   setAvailableTimes([]);
   return;
 }
    const bookedTimes = await getBookedTimes(selectedDate);
    
    const dayOfWeek = dayjs(selectedDate).format("dddd");
    const totalDuration = getTotalDuration(servicesSelected);
    const times = generateTimes(dayOfWeek, totalDuration);

    // Define os horários de almoço e final do expediente
    const lunchStartTime = moment(selectedDate).hour(12).minute(0);
    const lunchEndTime = lunchStartTime.clone().add(2, "hours");
    const dayEndTime = moment(selectedDate)
      .hour(dayOfWeek === "domingo" ? 11 : 20)
      .minute(0);

    // Remove os horários que se sobrepõem com os horários de almoço e final do dia
    const availableTimes = times.filter((time) => {
      const proposedStartTime = moment(selectedDate + " " + time);
      const proposedEndTime = proposedStartTime
        .clone()
        .add(totalDuration, "minutes");

      // Verifica se o horário proposto se sobrepõe com o horário de almoço ou final do expediente
      const isDuringLunch =
        proposedStartTime.isBefore(lunchEndTime) &&
        proposedEndTime.isAfter(lunchStartTime);
      const isPastDayEnd = proposedEndTime.isAfter(dayEndTime);

      // Verificar se o intervalo de tempo proposto não se sobrepõe com os horários já agendados
      const isOverlappingBooked = bookedTimes.some((bookedTime) => {
        const bookedStartTime = moment(selectedDate + " " + bookedTime.hour);
        const bookedEndTime = bookedStartTime
          .clone()
          .add(bookedTime.totalDuration, "minutes");
        return (
          proposedStartTime.isBetween(
            bookedStartTime,
            bookedEndTime,
            null,
            "[)"
          ) ||
          proposedEndTime.isBetween(bookedStartTime, bookedEndTime, null, "(]")
        );
      });

      // O horário é válido se não se sobrepõe com o almoço, não passa do final do expediente e não está reservado
      return !isDuringLunch && !isPastDayEnd && !isOverlappingBooked;
    });

    
    setAvailableTimes(availableTimes);
  };

// Função para calcular a duração total dos serviços selecionados
  const getTotalDuration = (selectedServices: string[]) => {
    console.log(selectedServices);
    console.log(services);
    
    
    return selectedServices.reduce((acc, servicesSelected) => {
      const serviceInfo = services.find(
        (service) => service.service === servicesSelected
      );
      console.log(serviceInfo);
      
      if (serviceInfo) {
        const serviceDuration = serviceInfo.duration;
        return acc + (serviceDuration || 0);
      }
      return acc;
    }, 0);
  };
// Função para gerar os horários disponíveis
  const generateTimes = (dayOfWeek: string, totalDuration: number) => {
    const saoPauloZone = "America/Sao_Paulo";
    let startTime = moment(selectedDate)
      .tz(saoPauloZone)
      .set({ hour: 7, minute: 0 });
    let endTime = moment(selectedDate)
      .tz(saoPauloZone)
      .set(
        dayOfWeek === "domingo"
          ? { hour: 11, minute: 0 }
          : { hour: 20, minute: 0 }
      );

    // Se for sábado, ajuste o horário de encerramento
    if (dayOfWeek === "sábado") {
      endTime.set({ hour: 19, minute: 0 });
    }

    const lunchStart = moment(selectedDate)
      .tz(saoPauloZone)
      .set({ hour: 12, minute: 0 });
    const lunchEnd = lunchStart.clone().add(2, "hours"); // Cria uma cópia de lunchStart e adiciona 2 horas para chegar ao final do almoço

    // Verificação de dia indisponível
    if (
      barberUnavailability.some(
        (offDay) =>
          offDay.selectedDate === selectedDate && offDay.timeOff === "full-day"
      )
    ) {
      return ["Sem horários disponíveis"];
    }

    // Ajuste do tempo de início se hoje for a data selecionada
    const currentTimeInSaoPaulo = moment().tz(saoPauloZone);
    if (
      currentTimeInSaoPaulo.isSame(startTime, "day") &&
      currentTimeInSaoPaulo.isAfter(startTime)
    ) {
      startTime = currentTimeInSaoPaulo.add(1, "hour").startOf("hour");
    }
    const morningEnd = moment(selectedDate)
      .tz(saoPauloZone)
      .set({ hour: 12, minute: 0 });
    const afternoonStart = morningEnd.clone(); // Pode ajustar se houver outro horário específico para começar a tarde
    let times = [];
    while (startTime.isBefore(endTime)) {
      // Ignora horários de manhã se a manhã for período de folga
      if (dayOffTimes.morningOff && startTime.isBefore(morningEnd)) {
        startTime = afternoonStart.clone(); // Ajusta o início para depois do horário da tarde
      }

      // Interrompe a adição de horários se for período de folga à tarde
      if (dayOffTimes.afternoonOff && startTime.isSameOrAfter(afternoonStart)) {
        break; // Não adicionar mais horários porque a tarde está de folga
      }

      // Ignora horários durante a pausa do almoço, se existir
      if (startTime.isBetween(lunchStart, lunchEnd, null, "[]")) {
        startTime = lunchEnd.clone();
      }

      // Verifica se ainda estamos dentro do horário de funcionamento depois das verificações acima
      if (startTime.isBefore(endTime)) {
        times.push(startTime.format("HH:mm"));
        startTime.add(totalDuration, "minutes"); // Adiciona a duração total ao startTime para obter o próximo horário disponível
      }
    }
    return times;
  };
// Função para lidar com o clique no horário
  const handleTimeClick = (time: string) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(
        selectedTimes.filter((selectedTime) => selectedTime !== time)
      );
      setValues({ ...values, hour: "" });
      setButtonEnviar(false);
    } else {
      setSelectedTimes([selectedTimes, time]);
      setValues({ ...values, hour: time });
      setButtonEnviar(true);
    }
  };
  // Função para atualizar os horários de folga com base na indisponibilidade
  const updateDayOffTimesBasedOnUnavailability = () => {
    const unavailabilityForSelectedDate = barberUnavailability.find(
      (offDay) => offDay.selectedDate === selectedDate
    );

    if (unavailabilityForSelectedDate) {
      setDayOffTimes({
        morningOff: unavailabilityForSelectedDate.timeOff === "morning",
        afternoonOff: unavailabilityForSelectedDate.timeOff === "afternoon",
        fullDayOff: unavailabilityForSelectedDate.timeOff === "full-day",
      });
    } else {
      setDayOffTimes({
        morningOff: false,
        afternoonOff: false,
        fullDayOff: false,
      });
    }
  };
  useEffect(() => {
    updateDayOffTimesBasedOnUnavailability();
  }, [selectedDate]);
  useEffect(() => {
    calculateAvailableTimes();
  }, [selectedDate, servicesSelected, barberUnavailability]);

  return (
    <div className="hours-contain">
      <p className="section-mensagem">Horários disponíveis:</p>
      <div className="hours">
        {(availableTimes[0] === "Sem horários disponíveis" ||
        availableTimes.length === 0) ? (
          <p className="no-hours">Sem horários disponíveis</p>
        ) : (
          availableTimes.map((time) => (
            <div key={time}>
              <button
                onClick={() => {
                  handleTimeClick(time);
                  if (selectedTimes.includes(time)) {
                    setDisableButton(true);
                  } else {
                    setDisableButton(false);
                  }
                }}
                className={
                  !selectedTimes.includes(time)
                    ? "button-time"
                    : "hours-selected"
                }
              >
                {time}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppointmentTimes;
