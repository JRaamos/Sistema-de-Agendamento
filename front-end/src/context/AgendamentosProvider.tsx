import React, {  useEffect, useRef, useState } from "react";
import AgendamentosContext from "./AgendamentosContext";
import {
  AgendamentosProviderProps,
  DayOff,
  Values,
} from "../types/AgendamentosProvider";
import dayjs from "dayjs";
import { OffDay } from "../types/dashboard";
import { FetchAPiGet, ServiceApi } from "../types/ApiReturn";
import { fetchAPiGetAllServices } from "../utils/fetchApi";

function AgendamentosProvider({ children }: AgendamentosProviderProps) {
  const [servicesSelected, setServicesSelected] = useState<string[]>([]);
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const [offDays, setOffDays] = useState<OffDay[]>([]);
 const [selectedOffDays, setSelectedOffDays] = useState<{
   [key: string]: string;
 }>({});
  const [isOffDay, setIsOffDay] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedOffDay, setSelectedOffDay] = useState<OffDay[]>([]);
  const [typeOffDay, setTypeOffDay] = useState(false);
  const [isOffDaySelected, setIsOffDaySelected] = useState<boolean>(false);
  const [typeOffDaySelected, setTypeOffDaySelected] = useState("");
  const [cancellationCandidate, setCancellationCandidate] = useState<
    string | null
  >(null);
  const [confirmOffDay, setConfirmOffDay] = useState(false);
  const [isRecurrentClient, setIsRecurrentClient] = useState<boolean>(false);
  const [schedules, setSchedules] = useState<FetchAPiGet[] | undefined>();

  const [isServices, setIsServices] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [isServicesSelected, setIsServicesSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState<null | string>(null);
  const [isDates, setIsDates] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [agendamentos, setAgendamentos] = useState("");
  const [phoneBottom, setPhoneBottom] = useState(false);
  const [disableInput, setDisableInput] = useState(true);
  const [isMyAgendamentos, setIsMyAgendamentos] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isName, setIsName] = useState(false);
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [istext, setIsText] = useState(false);
  const [isDate, setIsDate] = useState(false);
  const [phone, setPhone] = useState<string | number | null | undefined>("");
  const [isAgendamentos, setIsAgendamentos] = useState(false);
  const [buttonEnviar, setButtonEnviar] = useState(false);
  const [inputPhone, setInputPhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [buttonWelcome, setButtonWelcome] = useState(false);
  const [canRender, setCanRender] = useState(false);
  const [msgServices, setMsgServices] = useState(false);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [barberUnavailability, setBarberUnavailability] = useState<DayOff[]>([]);
  const [values, setValues] = useState<Values>({
    name: "",
    phone: undefined,
    date: "",
    hour: "",
    services: [],
    eventId: "",
    agendamentos: "",
    deviceId: "",
  });
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  const handleLocalStorange = () => {
    const storage = localStorage.getItem("agendamentos");
    if (storage) {
      const agendamentos = JSON.parse(storage);
      const newAgendamentos = [...agendamentos, values];
      localStorage.setItem("agendamentos", JSON.stringify(newAgendamentos));
      return;
    }
    localStorage.setItem("agendamentos", JSON.stringify([values]));
  };
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [services, setServices] = useState<ServiceApi[]>([]);

  const resetStates = () => {
    setInputValue("");
    setIsName(false);
    setText("");
    setText2("");
    setIsText(false);
    setIsDate(false);
    setIsPhone(false);
    setIsServices(false);
    setPhone("");
    setIsAgendamentos(false);
    setDisableInput(true);
    setIsServicesSelected(false);
    setIsDates(false);
    setSelectedDate(null);
    setIsMyAgendamentos(false);
    setValues({
      name: "",
      phone: undefined,
      date: "",
      hour: "",
      services: [],
      eventId: "",
      agendamentos: "",
      deviceId: "",
    });
    setDisableButton(true);
    setServicesSelected([]);
    setPhoneNumber(undefined);
    setInputPhone(false);
    setCanRender(false);
    setMsgServices(false);
  };
  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetchAPiGetAllServices();
      setServices(response);
    };
    fetchServices();
  }, [servicesSelected]);
  return (
    <AgendamentosContext.Provider
      value={{
        schedules,
        setSchedules,
        isRecurrentClient,
        setIsRecurrentClient,
        confirmOffDay,
        setConfirmOffDay,
        cancellationCandidate,
        setCancellationCandidate,
        typeOffDaySelected,
        setTypeOffDaySelected,
        services,
         setServices,
        isOffDaySelected,
        setIsOffDaySelected,
        typeOffDay,
        setTypeOffDay,
        selectedOffDay,
        setSelectedOffDay,
        selectedDay,
        setSelectedDay,
        isOffDay,
        setIsOffDay,
        selectedOffDays,
        setSelectedOffDays,
        offDays,
        setOffDays,
        currentMonth,
        setCurrentMonth,
        currentYear,
        setCurrentYear,
        values,
        phone,
        setPhone,
        phoneNumber,
        setPhoneNumber,
        isDate,
        setIsDate,
        isAgendamentos,
        setIsAgendamentos,
        containerRef,
        text2,
        setText2,
        availableTimes,
        setAvailableTimes,
        resetStates,
        setValues,
        isServices,
        buttonWelcome,
        setButtonWelcome,
        inputPhone,
        canRender,
        setCanRender,
        setInputPhone,
        buttonEnviar,
        setButtonEnviar,
        istext,
        setIsText,
        setIsServices,
        disableButton,
        setDisableButton,
        servicesSelected,
        msgServices,
        setMsgServices,
        bookedTimes,
        setBookedTimes,
        isServicesSelected,
        setServicesSelected,
        isMyAgendamentos,
        setIsMyAgendamentos,
        text,
        setText,
        setIsServicesSelected,
        selectedDate,
        setSelectedDate,
        disableInput,
        inputValue,
        setInputValue,
        setDisableInput,
        isDates,
        setIsDates,
        isPhone,
        agendamentos,
        setAgendamentos,
        phoneBottom,
        setPhoneBottom,
        handleLocalStorange,
        setIsPhone,
        isName,
        setIsName,
        barberUnavailability,
        setBarberUnavailability,
      }}
    >
      {children}
    </AgendamentosContext.Provider>
  );
}
export default AgendamentosProvider;
