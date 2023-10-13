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
  const [values, setValues] = useState({
    name: "",
    phone: "",
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
        setValues,
        isServices,
        setIsServices,
        disableButton,
        setDisableButton,
        servicesSelected,
        isServicesSelected,
        setServicesSelected,
        isMyAgendamentos,
        setIsMyAgendamentos,
        setIsServicesSelected,
        selectedDate,
        setSelectedDate,
        disableInput,
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
      }}
    >
      {children}
    </AgendamentosContext.Provider>
  );
}
export default AgendamentosProvider;
