export type LoggedInUser = {
  id: number
  email: string
  firstName: string
  lastName: string
  createdAt: string | null
  updatedAt: string | null
}

export type LoginInput = {
  email: string
  password: string
}

export type RegistrationInput = {
  email: string
  firstName: string
  lastName: string
  password: string
  repeatPassword: string
}
