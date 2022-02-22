import { useState } from "react"
import { useTranslation } from "next-i18next"

import { AuthApi } from "api"

const PasswordForgotForm: React.FunctionComponent = () => {
  const { t } = useTranslation("common")
  const [email, setEmail] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<string>("")
  const [error, setError] = useState<string>("")

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (error) setError("")
    setEmail(event.target.value)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    try {
      await AuthApi.sendPasswordRequestLink(email)
      setSuccess("An email has been sent.")
    } catch (error) {
      setError("Error")
    }
    setLoading(false)
  }

  return (
    <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          {t("components.forms.forgotPassword.email")}
        </label>
        <div className="mt-1">
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={handleChange}
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
          disabled={loading}
        >
          {t("components.forms.forgotPassword.send")}
        </button>
      </div>
    </form>
  )
}

export default PasswordForgotForm
