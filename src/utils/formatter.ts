export const percentFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function timeInMinutesToString(timeInMinutes: number) {
  const hours = String(Math.floor(timeInMinutes / 60)).padStart(2, '0')
  const minutes = String(timeInMinutes % 60).padStart(2, '0')
  const formattedTime = `${hours}:${minutes}`

  return formattedTime
}

export function dateFormatter(date: string) {
  return date.split('/').join('.')
}

export function stringToDate(date: string) {
  const formattedDate = new Date(
    dateFormatter(date).split('.').reverse().join('-'),
  )
  return formattedDate
}

export function dateToString(date: Date) {
  const formattedDate =
    String(date.getDay).padStart(2, '0') +
    '.' +
    String(date.getMonth).padStart(2, '0') +
    '.' +
    String(date.getFullYear)
  return formattedDate
}

export function hoursToMinutes(time: string) {
  const timeDivider = time.split(':')
  const hourInMinutes = Number(timeDivider[0]) * 60
  const minutes = Number(timeDivider[1])
  const formattedTime = hourInMinutes + minutes

  return formattedTime
}
