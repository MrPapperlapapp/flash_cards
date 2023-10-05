export type LogInBodyType = {
  password: string
  email: string
  rememberMe?: boolean | undefined
}

export type LogInResponseType = {
  accessToken: string
}

export type SignUpBodyType = {
  html?: string
  name?: string
  password: string
  email: string
  sendConfirmationEmail?: boolean
}
export type ProfileBodyType = {
  email?: string
  name?: string
  avatar?: any
}
export type RecoveryPassBodyType = {
  html: string
  email: string
  subject: string
}
export type UserType = {
  avatar: string
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
}
