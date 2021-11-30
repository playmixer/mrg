import {UserStoreProps} from "./store";

interface User {
  id: string
  username: string
  isAuth: boolean
  email: string
  roles: string[]
}

interface UserRequest {
  data: {
    data: UserStoreProps
    detail: string
  }
}
