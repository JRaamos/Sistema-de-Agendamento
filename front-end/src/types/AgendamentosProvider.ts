import { Dispatch, ReactNode, SetStateAction } from "react";

export type Values = {
  name: string;
  phone: string | undefined;
  date: string;
  hour: string;
  services: string[];
  eventId: string;
  agendamentos: string;
}

export type AgendamentosContextType = {
  values: Values;
  phone: string | undefined | number | null;
  setPhone: Dispatch<SetStateAction<string | number | undefined | null>>;
  phoneNumber: string | undefined;
  setPhoneNumber: Dispatch<SetStateAction<string | undefined >>;
  isDate: boolean;
  setIsDate: Dispatch<SetStateAction<boolean>>;
  isAgendamentos: boolean;
  setIsAgendamentos: Dispatch<SetStateAction<boolean>>;
  text2: string;
  setText2: Dispatch<SetStateAction<string>>;
  setValues: Dispatch<SetStateAction<Values>>;
  isServices: boolean;
  buttonWelcome: boolean;
  setButtonWelcome: Dispatch<SetStateAction<boolean>>;
  inputPhone: boolean;
  canRender: boolean;
  setCanRender: Dispatch<SetStateAction<boolean>>;
  setInputPhone: Dispatch<SetStateAction<boolean>>;
  buttonEnviar: boolean;
  setButtonEnviar: Dispatch<SetStateAction<boolean>>;
  istext: boolean;
  setIsText: Dispatch<SetStateAction<boolean>>;
  setIsServices: Dispatch<SetStateAction<boolean>>;
  disableButton: boolean;
  setDisableButton: Dispatch<SetStateAction<boolean>>;
  servicesSelected: string[];
  isServicesSelected: boolean;
  setServicesSelected: Dispatch<SetStateAction<string[]>>;
  isMyAgendamentos: boolean;
  setIsMyAgendamentos: Dispatch<SetStateAction<boolean>>;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  setIsServicesSelected: Dispatch<SetStateAction<boolean>>;
  selectedDate: string | null ;
  setSelectedDate: Dispatch<SetStateAction<string | null >>;
  disableInput: boolean;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  setDisableInput: Dispatch<SetStateAction<boolean>>;
  isDates: boolean;
  setIsDates: Dispatch<SetStateAction<boolean>>;
  isPhone: boolean;
  agendamentos: string;
  setAgendamentos: Dispatch<SetStateAction<string>>;
  phoneBottom: boolean;
  setPhoneBottom: Dispatch<SetStateAction<boolean>>;
  handleLocalStorange: () => void;
  setIsPhone: Dispatch<SetStateAction<boolean>>;
  isName: boolean;
  setIsName: Dispatch<SetStateAction<boolean>>;
  resetStates: () => void;
  msgServices: boolean;
  setMsgServices: Dispatch<SetStateAction<boolean>>;
  availableTimes: string[];
  setAvailableTimes: Dispatch<SetStateAction<string[]>>;
  containerRef: any;
  bookedTimes: string[];
  setBookedTimes: Dispatch<SetStateAction<string[]>>;
  scheduleData: number | null;
  setScheduleData: Dispatch<SetStateAction<number | null>>;
  cancellationsData: number | null;
  setCancelationsData: Dispatch<SetStateAction<number | null>>;
  futureSchedulesData: number | null;
  setFutureSchedulesData: Dispatch<SetStateAction<number | null>>;
  
};

export type AgendamentosProviderProps = {
  children: ReactNode;
};

