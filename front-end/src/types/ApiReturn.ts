export type Service = {
  service: string,
  price: string,
  duration: string
}
export type User = {
  name: string,
  phone: string,
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