import { ConvertRequest } from "../interfaces"
import { getHeaders } from "../utils/getHeaders"
import { API } from "./api"

export const getFiles = async () => {
  return await API.get("/files", {
    headers: getHeaders()
  })
    .then((res) => res.data)
    .catch((err) => err.response.data)
}

export const convertFile = async (data: ConvertRequest) => {
  return await API.post("/convert", data, {
    headers: getHeaders()
  })
    .then((res) => res.data)
    .catch((err) => err.response.data)
}