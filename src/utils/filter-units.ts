import { GymI } from '@/service/type'

const openingHours = {
  morning: {
    first: '06',
    last: '12',
  },
  afternoon: {
    first: '12',
    last: '18',
  },
  night: {
    first: '18',
    last: '23',
  },
}

type hourIndexes = 'morning' | 'afternoon' | 'night'

function transformWeekday(weekday: number) {
  switch (weekday) {
    case 0:
      return 'Dom.'
    case 6:
      return 'Sáb.'
    default:
      return 'Seg. à Sex.'
  }
}

function filterUnits(unit: GymI, openHour: string, closeHour: string) {
  if (!unit.schedules) return true

  const openHourFilter = parseInt(openHour, 10)
  const closeHourFilter = parseInt(closeHour, 10)

  const todaysWeekday = transformWeekday(new Date().getDay())

  for (let i = 0; i < unit.schedules.length; i++) {
    const scheduleHour = unit.schedules[i].hour
    const scheduleWeekday = unit.schedules[i].weekdays
    if (todaysWeekday === scheduleWeekday) {
      if (scheduleHour !== 'Fechada') {
        const [unitOpenHour, unitCloseHour] = scheduleHour.split(' às ')
        const unitOpenHourInt = parseInt(unitOpenHour.replace('h', ''), 10)
        const unitCloseHourInt = parseInt(unitCloseHour.replace('h', ''), 10)

        if (
          unitOpenHourInt <= openHourFilter &&
          unitCloseHourInt >= closeHourFilter
        )
          return true
        else return false
      }
    }
  }

  return false
}

export function filterrr(results: GymI[], showClosed: boolean, hour: string) {
  let intermediateResults = results

  if (showClosed) {
    intermediateResults = results.filter((location) => location.opened === true)
  }

  if (hour && openingHours[hour as hourIndexes]) {
    const OPEN_HOUR = openingHours[hour as hourIndexes].first
    const CLOSE_HOUR = openingHours[hour as hourIndexes].last
    return intermediateResults.filter((location) =>
      filterUnits(location, OPEN_HOUR, CLOSE_HOUR),
    )
  } else {
    return intermediateResults
  }
}
