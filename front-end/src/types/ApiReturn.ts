export type ServiceApi = {
  seviceId: number,
  service: string,
  price: number,
  duration: number
}

export type User = {
  name: string,
  phone: string,
  deviceId: string,
}
export type FetchAPiGet = {
  scheduleId: number,
  date: string,
  hour: string,
  eventId: string,
  userId: number,
  services: ServiceApi[]
  user: User
}

export type FetchAPi = {
  user: number,
  scheduleResult: {
    scheduleId: number,
    date: string,
    hour: string,
    userId: number,
    eventId: string,
  }
}

export type FetchAPiLogin = {
  mensage: string,
}