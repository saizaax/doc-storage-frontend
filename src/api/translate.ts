import { TranslateRequest } from "../interfaces"
import { getHeaders } from "../utils/getHeaders"
import { API } from "./api"

export const translateText = async (data: TranslateRequest) => {
  return await API.post("/translate", data, {
    headers: getHeaders()
  })
    .then((res) => res.data)
    .catch((err) => err.response.data)
}
