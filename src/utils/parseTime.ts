import moment from "moment"

export const parseTime = (time: string) => {
  return moment(time).format("DD.MM.YYYY HH:mm:ss")
}