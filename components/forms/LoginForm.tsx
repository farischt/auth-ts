import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useTranslation } from "next-i18next"

import type { LoginInput } from "types"
import { AuthApi } from "api"

const LoginForm: React.FunctionComponent = () => {
  const router = useRouter()
  const { t } = useTranslation("common")
  const [credentials, setCredentials] = useState<LoginInput>({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  function handleCredentialsChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (error) setError("")
    setCredentials((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }))
  }

  async function handleCredentialsSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()
    if (error) setError("")
    setLoading(true)
    try {
      await AuthApi.login(credentials)
      router.replace(router.asPath, undefined, { scroll: false })
    } catch (error) {
      setError("Error")
    }
    setLoading(false)
  }

  return (
    <form
      className="space-y-6"
      method="POST"
      onSubmit={handleCredentialsSubmit}
    >
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          {t("components.forms.login.email")}
        </label>
        <div className="mt-1">
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={credentials.email}
            onChange={handleCredentialsChange}
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          {t("components.forms.login.password")}
        </label>
        <div className="mt-1">
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={credentials.password}
            onChange={handleCredentialsChange}
            minLength={8}
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-900"
          >
            {t("components.forms.login.remember")}
          </label>
        </div>

        <div className="text-sm">
          <Link href="/auth/password/forgot">
            <a className="font-medium text-blue-600 hover:text-blue-700">
              {t("components.forms.login.forgot")}
            </a>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center">
        {error && <p className="text-sm text-red-600"> {error} </p>}
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50"
          disabled={loading || credentials.password.length < 8}
        >
          {t("components.forms.login.send")}
        </button>
      </div>
    </form>
  )
}

export default LoginForm
