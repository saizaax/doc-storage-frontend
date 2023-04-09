import { AuthRequest } from "../interfaces"
import { getHeaders } from "../utils/getHeaders"
import { API } from "./api"

export const getProfile = async () => {
  return API.get("/users/me", {
    headers: getHeaders()
  })
    .then((res) => res.data)
    .catch((err) => err.response.data)
}

export const validateToken = async () => {
  return API.get("/auth/validate", {
    headers: getHeaders()
  })
    .then((res) => res.data)
    .catch((err) => err.response.data)
}

export const login = async (data: AuthRequest) => {
  return API.post("/auth/login", data)
    .then((res) => res.data)
    .catch((err) => err.response.data)
}

export const register = async (data: AuthRequest) => {
  return API.post("/auth/register", data)
    .then((res) => res.data)
    .catch((err) => err.response.data)
}
