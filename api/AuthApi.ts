import axios from "axios"
import type { LoginInput } from "./types"

export default class AuthApi {
  private static uri = "/api/auth"

  public static async login(credentials: LoginInput) {
    return await axios.post(`${this.uri}/login`, credentials)
  }

  public static async logout() {
    return await axios.post(`${this.uri}/logout`)
  }
}
