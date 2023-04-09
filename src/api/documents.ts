import { AddDocumentRequest, AddFileRequest } from "../interfaces"
import { getHeaders } from "../utils/getHeaders"
import { API } from "./api"

export const getDocuments = async () => {
  return await API.get("/documents", {
    headers: getHeaders()
  })
    .then((res) => res.data)
    .catch((err) => err.response.data)
}

export const addDocument = async (data: AddDocumentRequest) => {
  const formData = new FormData()
  
  formData.append("name", data.name)
  formData.append("description", data.description)
  formData.append("file", data.file as File)

  return await API.post("/documents/upload", formData, {
    headers: {...getHeaders(), "Content-Type": "multipart/form-data"},
  })
    .then((res) => res.data)
    .catch((err) => err.response.data)
}

export const addFile = async (data: AddFileRequest) => {
  const formData = new FormData()
  
  formData.append("name", data.name)
  formData.append("description", data.description)
  formData.append("file", data.file as File)

  return await API.post(`/documents/upload/${data.documentId}`, formData, {
    headers: {...getHeaders(), "Content-Type": "multipart/form-data"},
  })
    .then((res) => res.data)
    .catch((err) => err.response.data)
}

export const deleteDocument = async (id: string) => {
  return await API.delete(`/documents/${id}`, {
    headers: getHeaders()
  })
    .then((res) => res.data)
    .catch((err) => err.response.data)
}