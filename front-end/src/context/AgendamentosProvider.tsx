import React, { useState } from "react";
import AgendamentosContext from "./AgendamentosContext";
type UseProviderProps = {
  children: React.ReactNode;
};

function AgendamentosProvider({ children }: UseProviderProps) {
  const [servicesSelected, setServicesSelected] = useState([]);
  const [isServices, setIsServices] = useState(false);
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
        servicesSelected,
        setServicesSelected,
        values,
        setValues,
        isServices,
        setIsServices,
      }}
    >
      {children}
    </AgendamentosContext.Provider>
  );
}
export default AgendamentosProvider;
