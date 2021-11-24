export interface User {
  id: string
  username: string
  isAuth: boolean
  email: string
  roles: string[]
}

export interface UserRequest {
  data: {
    data: User
    detail: string
  }
}
