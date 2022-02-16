import Link from "next/link"
import Head from "next/head"

import type { LoggedInUser } from "../../types"
import LoginForm from "../../components/forms/LoginForm"
import LogoutForm from "../../components/forms/LogoutForm"

type LoginPageProps = {
  user: LoggedInUser | null
}

export default function LoginPage({ user }: LoginPageProps) {
  if (user) {
    return (
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            <Link href="/">
              <a className="text-blue-600 hover:text-blue-700"> &larr;</a>
            </Link>{" "}
            Logged in as {user.firstName}
          </h2>

          <LogoutForm />

          <p className="mt-2 text-center text-sm text-gray-600">
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Powered by Authentication System
            </a>
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Sign in</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            <Link href="/">
              <a className="text-blue-600 hover:text-blue-700"> &larr;</a>
            </Link>{" "}
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Powered by Authentication System
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  )
}

import Server from "@/server/lib"
import { GetServerSideProps, GetServerSidePropsContext } from "next"

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const user = await Server.getAuthenticatedUser(context)

  return {
    props: {
      user: user?.toJSON() || null,
    },
  }
}
