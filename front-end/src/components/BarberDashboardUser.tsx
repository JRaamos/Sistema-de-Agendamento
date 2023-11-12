import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import "../styles/barberDashboardCalendar.css";
import {
  fetchApiCreateDayOff,
  fetchApiDeleteDayOff,
  fetchApiGetDayOff,
} from "../utils/fetchApi";
import ButtonOffDayCalendar from "./ButtonOffDayCalendar";
import CalendarNavigation from "./CalendarNavigation";
import CalendarGrid from "./CalendarGrid";
import SchedulesDashboard from "./schedulesDashboard";
import { AgendamentosContextType } from "../types/AgendamentosProvider";
import AgendamentosContext from "../context/AgendamentosContext";
import { BarberDashboardUserProps, OffDay } from "../types/dashboard";

dayjs.locale("pt-br");



function BarberDashboardUser({
  isOffDay,
  isRecurrentClient,
  selectedOffDays,
  setSelectedOffDays,
  confirmOffDay,
  setConfirmOffDay,
  selectedOffDay,
  setSelectedOffDay,
}: BarberDashboardUserProps) {
  const {} = useContext(AgendamentosContext);
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const [offDays, setOffDays] = useState<OffDay[]>([]);

  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const [cancellationCandidate, setCancellationCandidate] = useState<
    string | null
  >(null);
  const [isOffDaySelected, setIsOffDaySelected] = useState<boolean>(false);
  const [typeOffDay, setTypeOffDay] = useState(false);
  const [typeOffDaySelected, setTypeOffDaySelected] = useState("");
  const [deleteOffDay, setDeleteOffDay] = useState("");
  const [loading, setLoading] = useState(false);

  const { setSelectedDate } =
    useContext<AgendamentosContextType>(AgendamentosContext);

  const token = localStorage.getItem("token");

  const prepareCancellation = (day: number) => {
    const dateString = dayjs(new Date(currentYear, currentMonth, day)).format(
      "MM/DD/YYYY"
    );
    setCancellationCandidate(dateString);
  };

  const cancelOffDay = async () => {
    if (cancellationCandidate) {
      setLoading(true);
      const data = await fetchApiDeleteDayOff(cancellationCandidate, token);
      if (data) {
        setDeleteOffDay(data);
      }
      const selectedOffDayCancelled = offDays.filter(
        (offDay) => offDay.selectedDate !== cancellationCandidate
      );
      setOffDays(selectedOffDayCancelled);
      setCancellationCandidate(null); // Limpa a candidata a cancelamento após o cancelamento
      localStorage.setItem("offDays", JSON.stringify(selectedOffDayCancelled));
      setTimeout(() => {
        if (data) {
          setLoading(false);
        }
      }, 3000);
      setTimeout(() => {
        if (data) {
          setDeleteOffDay("");
        }
      }, 50000);
    }
  };
  // Função para alternar o estado de um dia selecionado
  const toggleOffDay = (day: number) => {
    const dateString = dayjs(new Date(currentYear, currentMonth, day)).format(
      "MM/DD/YYYY"
    );
    console.log(dateString);
    
    if (offDays.some((offDay) => offDay.selectedDate === dateString)) {
      prepareCancellation(day); // Aqui você pode chamar diretamente a função prepareCancellation.
      setCancellationCandidate(dateString); // Defina o cancellationCandidate para a data clicada.
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
    setSelectedDay(null); // Limpa o dia selecionado atualmente
    setSelectedOffDay([]); // Limpa os dias selecionados
    setIsOffDaySelected(false);
    setConfirmOffDay(false);
    setDeleteOffDay(data);
    setTimeout(() => {
      if (data) {
        setLoading(false);
      }
    }, 3000);
    setTimeout(() => {
      if (data) {
        setDeleteOffDay("");
      }
    }, 50000);
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
    const handleOffDays = async () => {
      const data = await fetchApiGetDayOff();
      if (data) {
        setOffDays(data);
      }
    };
    handleOffDays();
  }, []);

  return (
    <>
      <div className="title-contain">
        <div className="option-one">
          {isOffDay && <p className="paragraph">Selecione o dia de folga: </p>}
          {isRecurrentClient && (
            <p className="paragraph ">
              Escolha o dia para realizar o agendamento:{" "}
            </p>
          )}
        </div>
        <div className="barber-schedule">
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
            setConfirmOffDay={setConfirmOffDay}
            isRecurrentClient={isRecurrentClient}
            setIsOffDaySelected={setIsOffDaySelected}
          />
        </div>
      </div>
      <div>
        {isOffDay && (
          <ButtonOffDayCalendar
            handleAddOffDay={handleAddOffDay}
            confirmSelectedOffDays={confirmSelectedOffDays}
            cancelOffDay={cancelOffDay}
            cancellationCandidate={cancellationCandidate}
            selectedOffDays={selectedOffDays}
            typeOffDay={typeOffDay}
            setTypeOffDay={setTypeOffDay}
            typeOffDaySelected={typeOffDaySelected}
            setTypeOffDaySelected={setTypeOffDaySelected}
            confirmOffDay={confirmOffDay}
            selectedOffDay={selectedOffDay}
            deleteOffDay={deleteOffDay}
            loading={loading}
          />
        )}
        {isRecurrentClient && (
          <SchedulesDashboard
            isOffDaySelected={isOffDaySelected}
            setIsOffDaySelected={setIsOffDaySelected}
            selectedOffDays={selectedOffDays}
            setSelectedOffDays={setSelectedOffDays}
          />
        )}
      </div>
    </>
  );
}

export default BarberDashboardUser;
