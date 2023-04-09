import { getHeaders } from "../utils/getHeaders"
import { API } from "./api"

export const textAnalyze = async (id: string) => {
  return await API.get(`/vision/${id}`, {
    headers: getHeaders()
  })
    .then((res) => res.data)
    .catch((err) => err.response.data)
}
