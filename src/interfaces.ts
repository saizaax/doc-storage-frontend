export interface AuthRequest {
  email: string
  password: string
}

export interface AddDocumentRequest {
  name: string
  description: string
  file: File | null
}

export interface AddFileRequest {
  documentId: string
  name: string
  description: string
  file: File | null
}

export interface ConvertRequest {
  fileId: string
  format: null | string
}

export interface TranslateRequest {
  textId: string
  language: null | string
}
