import Link from "next/link"
import Head from "next/head"
import { useTranslation } from "next-i18next"

import type { LoggedInUser } from "../../types"
import RegistrationForm from "../../components/forms/RegistrationForm"
import LogoutForm from "../../components/forms/LogoutForm"

type RegisterPageProps = {
  user: LoggedInUser | null
}

export default function RegisterPage({ user }: RegisterPageProps) {
  const { t } = useTranslation("common")

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
            {t("pages.register.title")}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              {t("pages.register.subtitle")}
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <RegistrationForm />
          </div>
        </div>
      </div>
    </>
  )
}

import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import Server from "@/server/lib"

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const user = await Server.getAuthenticatedUser(context)

  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? "en", ["common"])),
      user: user?.toJSON() || null,
    },
  }
}
