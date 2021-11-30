interface RequestResult {
  data?: any
  success?: boolean
  detail?: string
}

interface RequestError {
  message: string
  response: {
    data: {
      detail: string
    }
  }
}
