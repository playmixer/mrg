export interface User {
    id: string
    username: string
    isAuth: boolean
    email: string
    roles: []
}

export interface UserRequest {
    data: {
        data: User
        detail: string
    }
}
