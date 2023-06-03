import axios from "axios"

export const API = axios.create({
  baseURL: "https://docstorage.saizaax.xyz/api",
  headers: { "Content-Type": "application/json" }
})
