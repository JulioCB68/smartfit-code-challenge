export interface GymI {
  id: number
  title: string
  content: string
  opened: boolean
  mask: string
  towel: string
  fountain: string
  locker_room: string
  schedules: {
    weekdays: string
    hour: string
  }[]

  street?: string
  region?: string
  city_name?: string
  state_name?: string
  uf?: string
}
