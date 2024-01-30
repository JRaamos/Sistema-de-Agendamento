export type Service = {
  service: string,
  price: string,
  duration: string
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
  services: Service[]
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
  token: string
}