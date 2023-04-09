import { getHeaders } from "../utils/getHeaders"
import { API } from "./api"

export const getDocuments = async () => {
  return await API.get("/documents", {
    headers: getHeaders()
  })
    .then((res) => res.data)
    .catch((err) => err.response.data)
}
