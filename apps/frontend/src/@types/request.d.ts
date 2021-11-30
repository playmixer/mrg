interface RequestResult {
  status: number
  data: {
    data?: any
    success?: boolean
    detail?: string
  }
}

interface RequestError {
  message: string
  response: {
    data: {
      detail: string
    }
  }
}
