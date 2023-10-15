export type LoginArgs = {
  email: string
  password: string
  rememberMe?: boolean
}
export type LoginResponse = { accessToken: string }
