import React, { useState } from "react";
import AgendamentosContext from "./AgendamentosContext";
type UseProviderProps = {
  children: React.ReactNode;
};

function AgendamentosProvider({ children }: UseProviderProps) {
  const [servicesSelected, setServicesSelected] = useState([]);
  const [isServices, setIsServices] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [isServicesSelected, setIsServicesSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
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
  const [phone, setPhone] = useState("");
  const [isAgendamentos, setIsAgendamentos] = useState(false);
  const [buttonEnviar, setButtonEnviar] = useState(false);
  const [inputPhone, setInputPhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [buttonWelcome, setButtonWelcome] = useState(false);
  const [values, setValues] = useState({
    name: "",
    phone: null,
    date: "",
    hour: "",
    services: "",
  });
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
        text2,
        setText2,
        setValues,
        isServices,
        buttonWelcome,
        setButtonWelcome,
        inputPhone,
        setInputPhone,
        buttonEnviar,
        setButtonEnviar,
        istext,
        setIsText,
        setIsServices,
        disableButton,
        setDisableButton,
        servicesSelected,
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
      }}
    >
      {children}
    </AgendamentosContext.Provider>
  );
}
export default AgendamentosProvider;
