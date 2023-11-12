export type OffDay = {
  selectedDate: string;
  timeOff: "morning" | "afternoon" | "full-day";
};
export interface ButtonOffDayCalendarProps {
  handleAddOffDay: (type: "morning" | "afternoon" | "full-day") => void;
  confirmSelectedOffDays: () => void;
  cancelOffDay: () => void;
  deleteOffDay: string;
  loading: boolean;
}
export interface BarberDashboardUserProps {
  isOffDay: boolean;
  isRecurrentClient: boolean;
  selectedOffDays: { [key: string]: string };
  setSelectedOffDays: React.Dispatch<React.SetStateAction<{ [key: string]: string; }>>;
  confirmOffDay: boolean;
  setConfirmOffDay: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOffDay: OffDay[];
  setSelectedOffDay: React.Dispatch<React.SetStateAction<OffDay[]>>;
}
export interface CalendarNavigationProps {
  currentYear: number;
  currentMonth: number;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
}