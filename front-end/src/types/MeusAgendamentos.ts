export type Agendamentos = {
  name: string;
  date: string;
  hour: string | number;
  services: string[];
  agendamentos: string;
  price?: number;
}
export interface AgendamentosCardProps {
  agendamentos: Agendamentos[];
  setCancelar: (value: boolean) => void;
  setHour: (value: string | number) => void;
  setDate: (value: string ) => void;
}