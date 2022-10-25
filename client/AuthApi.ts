import axios from "axios"
import type { LoginInput, RegistrationInput } from "./types"

export default class AuthApi {
  private static uri = "/api/auth"

  public static async login(credentials: LoginInput) {
    return await axios.post(`${this.uri}/login`, credentials)
  }

  public static async logout() {
    return await axios.post(`${this.uri}/logout`)
  }

  public static async register(input: RegistrationInput) {
    return await axios.post(`${this.uri}/register`, input)
  }

  public static async sendPasswordRequestLink(email: string) {
    return await axios.post(`${this.uri}/password/request`, { email })
  }
}
