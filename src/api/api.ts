import axios from "axios"

export const API = axios.create({
  baseURL: "https://docstorage.saizaax.dev/api",
  headers: { "Content-Type": "application/json" }
})
