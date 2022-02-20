import { useState } from "react"
import { useTranslation } from "next-i18next"

import type { RegistrationInput } from "types"
import { AuthApi } from "api"

const RegistrationForm: React.FunctionComponent = () => {
  const { t } = useTranslation("common")

  const [user, setUser] = useState<RegistrationInput>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    repeatPassword: "",
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<string>("")
  const [error, setError] = useState<string>("")

  function handleUserChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (error) setError("")
    setUser((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }))
  }

  async function handleUserSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    try {
      await AuthApi.register(user)
      setSuccess("An email has been sent.")
    } catch (error) {
      setError("Error")
    }
    setLoading(false)
  }

  return (
    <form className="space-y-6" method="POST" onSubmit={handleUserSubmit}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          {t("components.forms.register.email")}
        </label>
        <div className="mt-1">
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={user.email}
            onChange={handleUserChange}
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          {t("components.forms.register.firstName")}
        </label>
        <div className="mt-1">
          <input
            id="firstName"
            type="text"
            required
            value={user.firstName}
            onChange={handleUserChange}
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          {t("components.forms.register.lastName")}
        </label>
        <div className="mt-1">
          <input
            id="lastName"
            type="text"
            required
            value={user.lastName}
            onChange={handleUserChange}
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          {t("components.forms.register.password")}
        </label>
        <div className="mt-1">
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={user.password}
            onChange={handleUserChange}
            minLength={8}
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          {t("components.forms.register.password")}
        </label>
        <div className="mt-1">
          <input
            id="repeatPassword"
            type="password"
            autoComplete="current-password"
            required
            value={user.repeatPassword}
            onChange={handleUserChange}
            minLength={8}
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex items-center justify-center">
        {error && <p className="text-sm text-red-600"> {error} </p>}
        {success && <p className="text-sm text-blue-600"> {success} </p>}
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50"
          disabled={
            loading ||
            (user.password.length > 0 && user.password.length < 8) ||
            user.password !== user.repeatPassword
          }
        >
          {t("components.forms.register.send")}
        </button>
      </div>
    </form>
  )
}

export default RegistrationForm
