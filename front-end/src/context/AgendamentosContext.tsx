import { createContext } from "react";
import { AgendamentosContextType } from "../types/AgendamentosProvider";

const AgendamentosContext = createContext<AgendamentosContextType>(
  {} as AgendamentosContextType
);

export default AgendamentosContext;
