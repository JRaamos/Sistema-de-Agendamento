import React, { useEffect, useRef, useState } from "react";
import AgendamentosContext from "./AgendamentosContext";
import {
  AgendamentosProviderProps,
  DayOff,
  Values,
} from "../types/AgendamentosProvider";
import dayjs from "dayjs";

function AgendamentosProvider({ children }: AgendamentosProviderProps) {
  const [servicesSelected, setServicesSelected] = useState<string[]>([]);

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
    date: "" ,
    hour: "",
    services: [],
    eventId: "",
    agendamentos: "",
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
    });
    setDisableButton(true);
    setServicesSelected([]);
    setPhoneNumber(undefined);
    setInputPhone(false);
    setCanRender(false);
    setMsgServices(false);
  };

  return (
    <AgendamentosContext.Provider
      value={{
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
