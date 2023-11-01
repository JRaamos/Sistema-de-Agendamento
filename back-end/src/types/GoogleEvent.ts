export type GoogleEvent = {
  summary: string;
  location: string;
  description: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
};

export type SchedulesEvent = {
  date: string,
  hour: string,
  name: string,
  phone: string,
  services: string[]
};
