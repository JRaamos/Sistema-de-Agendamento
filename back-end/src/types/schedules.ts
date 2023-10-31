import { ServiceInputtableTypes } from '../database/models/service.model';

export type Schedule = {
  scheduleId: number;
  date: string;
  hour: string;
  userId: number;
};

export type ScheduleService = Schedule & {
  services: ServiceInputtableTypes[];
};
