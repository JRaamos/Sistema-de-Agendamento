import { ServiceInputtableTypes } from '../database/models/service.model';
import { User } from './User';

export type Schedule = {
  scheduleId: number;
  date: string;
  hour: string;
  userId: number;
  eventId: string;
  user?: User;
};

export type ScheduleService = Schedule & {
  services: ServiceInputtableTypes[];
};
export type ScheduleAllUser = Schedule & {
  user: User;
};
