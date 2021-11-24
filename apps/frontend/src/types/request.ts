export interface RequestResult {
  status: number
  data: {
    data?: object
    success?: boolean
    detail?: string
  }
}

export interface RequestError {
  message: string
  response: {
    data: {
      detail: string
    }
  }
}
