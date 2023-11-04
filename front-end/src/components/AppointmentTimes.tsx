import React, { FC, useContext, useEffect, useState } from "react";
import moment from "moment";
import dayjs from "dayjs";
import services from "../utils/services.json";
import "../styles/appointmentTimes.css";
import AgendamentosContext from "../context/AgendamentosContext";
import { fetchAPiGet } from "../utils/fetchApi";
import { Service } from "../types/Service";
import { BookTime } from "../types/AppointmentTimes";

const AppointmentTimes = () => {
  const [selectedTimes, setSelectedTimes] = useState<any[]>([]);
const [dayOffTimes, setDayOffTimes] = useState({
  morningOff: false,
  afternoonOff: false,
  fullDayOff: false,
  tuesdayOff: false,
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
  } = useContext(AgendamentosContext);

  // Função para buscar os horários já agendados
  const getBookedTimes = async (date: string | null) => {
    const response = await fetchAPiGet(date);
    return response.map((item: any) => {
      // Calcula a duração total de todos os serviços para este horário
      const totalDuration = item.services.reduce((total: number, service: Service) => {
        return total + service.duration;
      }, 0);

      return {
        hour: item.hour,
        totalDuration,
      };
    });
  };

  const calculateAvailableTimes = async () => {
    if (servicesSelected.length === 0 || !selectedDate) {
      setAvailableTimes([]);
      return;
    }

    const bookedTimes = await getBookedTimes(selectedDate);
    const dayOfWeek = dayjs(selectedDate).format("dddd");
    const totalDuration = getTotalDuration(servicesSelected);
    const times = generateTimes(dayOfWeek, totalDuration);

    // Remove os horários já agendados da lista de horários disponíveis
    const availableTimes = times.filter((time) => {
      const proposedStartTime = moment(selectedDate + " " + time);
      const proposedEndTime = proposedStartTime
        .clone()
        .add(totalDuration, "minutes");

      // Verificar se o intervalo de tempo proposto não se sobrepõe com os horários já agendados
      const isOverlapping = bookedTimes.some((bookedTime: BookTime) => {
        const bookedStartTime = moment(selectedDate + " " + bookedTime.hour);
        const bookedEndTime = bookedStartTime
          .clone()
          .add(bookedTime.totalDuration, "minutes");

        // Verifica se há sobreposição
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

      return !isOverlapping;
    });


    setAvailableTimes(availableTimes);
  };

  const getTotalDuration = (selectedServices: string[]) => {
    return selectedServices.reduce((acc, servicesSelected) => {
      const serviceInfo = services.find(
        (service) => service.services === servicesSelected
      );
      if (serviceInfo) {
        const serviceDuration = serviceInfo.duration;
        return acc + (serviceDuration || 0);
      }
      return acc;
    }, 0);
  };

  const generateTimes = (dayOfWeek: string, totalDuration: number) => {
    const startTime = moment(selectedDate).set({ hour: 7, minute: 0 });
    let endTime = moment(selectedDate).set({ hour: 20, minute: 0 });
    const morningOffEnd = moment(selectedDate).set({ hour: 12, minute: 0 });
    const afternoonOffStart = moment(selectedDate).set({
      hour: 12,
      minute: 0,
    });

    const afternoonOffEnd = moment(selectedDate).set({ hour: 20, minute: 0 });

    const isOffDay = barberUnavailability.some(
      (offDay) => offDay.selectedDate === selectedDate && dayOffTimes.fullDayOff
    );

    if (isOffDay) {
      return ["Sem horários disponíveis"];
    }

    if (dayOfWeek === "sábado") {
      endTime = moment(selectedDate).set({ hour: 19, minute: 0 });
    }
    if (dayOfWeek === "domingo") {
      endTime = moment(selectedDate).set({ hour: 11, minute: 0 });
    }

    if (dayOfWeek === "terça-feira" && dayOffTimes.tuesdayOff) {
      return ["Sem horários disponíveis"];
    }
    const times = [];

    while (startTime.isBefore(endTime)) {
      const currentTime = startTime.format("HH:mm");
      if (
        dayOffTimes.morningOff &&
        startTime.isBefore(morningOffEnd)
      ) {
        startTime.add(totalDuration, "minutes");
        continue;
      }

      if (
        dayOffTimes.afternoonOff &&
        startTime.isAfter(afternoonOffStart) &&
        startTime.isBefore(afternoonOffEnd)
      ) {
        startTime.add(totalDuration, "minutes");
        continue;
      }

      if (
        startTime.isAfter(moment(selectedDate).set({ hour: 12, minute: 0 })) &&
        startTime.isBefore(moment(selectedDate).set({ hour: 14, minute: 0 }))
      ) {
        startTime.add(totalDuration, "minutes");
        continue;
      }

      times.push(currentTime);
      startTime.add(totalDuration, "minutes");
    }

    return times;
  };


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
 const updateDayOffTimesBasedOnUnavailability = () => {
   const unavailabilityForSelectedDate = barberUnavailability.find(
     (offDay) => offDay.selectedDate === selectedDate
   );

   if (unavailabilityForSelectedDate) {
     setDayOffTimes({
       morningOff: unavailabilityForSelectedDate.timeOff === "morning",
       afternoonOff: unavailabilityForSelectedDate.timeOff === "afternoon",
       fullDayOff: unavailabilityForSelectedDate.timeOff === "full-day",
       tuesdayOff: dayjs(selectedDate).day() === 2, 
     });
   } else {
     setDayOffTimes({
       morningOff: false,
       afternoonOff: false,
       fullDayOff: false,
       tuesdayOff: dayjs(selectedDate).day() === 2,
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
        {availableTimes[0] === "Sem horários disponíveis" ? (
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
