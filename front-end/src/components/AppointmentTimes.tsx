import React, { FC, useContext, useEffect, useState } from "react";
import moment from "moment";
import dayjs from "dayjs";
import services from "../utils/services.json";
import "../styles/appointmentTimes.css";
import AgendamentosContext from "../context/AgendamentosContext";
import { fetchAPiGet } from "../utils/fetchApi";


const AppointmentTimes = () => {
  const [selectedTimes, setSelectedTimes] = useState<any[]>([]);
  const {
    servicesSelected,
    values,
    setValues,
    setDisableButton,
    setButtonEnviar,
    selectedDate,
    availableTimes,
    setAvailableTimes,
    bookedTimes,
    setBookedTimes,
  } = useContext(AgendamentosContext);

<<<<<<< HEAD
  // Função para buscar os horários já agendados
 const getBookedTimes = async (date: string | null) => {
   const response = await fetchAPiGet(date);
   return response.map((item: any) => {
     // Calcula a duração total de todos os serviços para este horário
     const totalDuration = item.services.reduce((total, service) => {
       return total + service.duration;
     }, 0);

     return {
       hour: item.hour,
       totalDuration,
     };
   });
 };


  // Função para calcular os horários disponíveis com base nos serviços selecionados e na data
  const calculateAvailableTimes = async () => {
    if (servicesSelected.length === 0 || !selectedDate) {
      setAvailableTimes([]);
      return;
=======
    // Função para buscar os horários já agendados
    const getBookedTimes = async (date: string | null) => {
      const response = await fetchAPiGet(date);
      const bookedTimes = response.map((item: any) => {
        const obj = {
        hour: item.hour,
        services: item.services,
        };
        return obj;
      });      
      return bookedTimes;
    };

const filterBookedTimes = (times: string[], bookedTimes: string[]) => {
  console.log(times);
  console.log(bookedTimes);
  
  return times.filter((time) => !bookedTimes.includes(time));
};
  // Função para calcular os horários disponíveis com base nos serviços selecionados e na data
const calculateAvailableTimes = async () => {
  if (servicesSelected.length === 0 || !selectedDate) {
    setAvailableTimes([]);
    return;
  }

  // Busca os horários já agendados
  const bookedTimes = await getBookedTimes(selectedDate);

  const dayOfWeek = dayjs(selectedDate).format("dddd");

  const totalDuration = getTotalDuration(servicesSelected);

  const times = generateTimes(dayOfWeek, totalDuration);

  // Remove os horários já agendados da lista de horários disponíveis
  const availableTimes = filterBookedTimes(times, bookedTimes.map((item: any) => item.hour));

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
>>>>>>> d5587d4 (feat: ajusta função de renderização de horario)
    }

    // Busca os horários já agendados
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
      const isOverlapping = bookedTimes.some((bookedTime) => {
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

      // Se não houver sobreposição, o horário está disponível
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

    if (dayOfWeek === "Saturday") {
      endTime = moment(selectedDate).set({ hour: 19, minute: 0 });
    }
    if (dayOfWeek === "Sunday") {
      endTime = moment(selectedDate).set({ hour: 11, minute: 0 });
    }
<<<<<<< HEAD
=======
  }
  console.log(times);
  

  return times;
};
>>>>>>> d5587d4 (feat: ajusta função de renderização de horario)

    const times = [];

    if (dayOfWeek === "Tuesday") {
      return ["Sem horários disponíveis"];
    }

    while (startTime.isBefore(endTime)) {
      const currentTime = startTime.format("HH:mm");
      if (
        startTime.isSameOrAfter(
          moment(selectedDate).set({ hour: 12, minute: 0 })
        ) &&
        startTime.isBefore(moment(selectedDate).set({ hour: 14, minute: 0 }))
      ) {
      } else {
        times.push(currentTime);
      }
      startTime.add(totalDuration, "minutes");
      if (startTime.isSameOrAfter(endTime)) {
        break;
      }
    }

    return times;
  };


  // Função para lidar com a seleção de horários
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

  useEffect(() => {
    calculateAvailableTimes();
  }, [selectedDate, servicesSelected]);

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
