export interface ApiError {
  error: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface LoginOutput {
  loggedIn: boolean
  id: number
  email: string
  firstName: string
  lastName: string
}

export interface RegistrationInput {
  email: string
  firstName: string
  lastName: string
  password: string
  repeatPassword: string
}

export interface RegistrationOutput {
  success: boolean
  id: number
  email: string
  firstName: string
  lastName: string
}
