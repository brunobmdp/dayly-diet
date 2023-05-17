import { stringToDate } from './formatter'

function dateCompare(dateA: string, dateB: string) {
  const formattedDateA = stringToDate(dateA)
  const formattedDateB = stringToDate(dateB)
  let result = 0
  formattedDateA < formattedDateB ? (result = -1) : (result = 1)

  return result
}

export function sortDateNewToOld(datas: string[]) {
  return datas.sort(dateCompare)
}
