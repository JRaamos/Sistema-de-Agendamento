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
  const [values, setValues] = useState({
    name: "",
    phone: "",
    date: "",
    hour: "",
    services: "",
  });

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
        setIsPhone,
      }}
    >
      {children}
    </AgendamentosContext.Provider>
  );
}
export default AgendamentosProvider;
