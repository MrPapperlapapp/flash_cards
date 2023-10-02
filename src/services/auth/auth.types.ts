export type LogInBodyType = {
  password: string
  email: string
  rememberMe?: boolean | undefined
}

export type LogInResponseType = {
  accessToken: string
}

export type SignUpBodyType = {
  name?: string
  password: string
  email: string
  sendConfirmationEmail?: boolean
}

export type SignUpResponseType = {
  avatar: string
  id: string
  email: string
  isEmailVerified: true
  name: string
  created: string
  updated: string
}
