import Link from "next/link"
import Head from "next/head"
import { useTranslation } from "next-i18next"

type Props = {
  error?: string
  email?: string
  firstName?: string
}

export default function AccountConfirmationPage({
  error,
  email,
  firstName,
}: Props) {
  const { t } = useTranslation("common")

  return (
    <>
      <Head>
        <title>As - {t("pages.confirmation.title")}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            <Link href="/">
              <a className="text-blue-600 hover:text-blue-700"> &larr;</a>
            </Link>{" "}
            {t("pages.confirmation.title")}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              {t("subtitle")}
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {error && <p className="text-sm font-bold"> {error} </p>}
            {email && firstName && (
              <p className="text-sm font-bold">
                {t("pages.confirmation.text", { firstName, email })}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Server from "server/lib"
import Database from "server/database"

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const translation = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ])
  const user = await Server.getAuthenticatedUser(context)

  if (user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  const { token } = context.query

  if (!token) {
    return {
      props: {
        ...translation,
        error: "missing_token",
      },
    }
  }

  const validToken =
    Server.isUUID(token.toString()) &&
    (await Database.AccountConfirmationToken.findByPk(token.toString()))

  if (!validToken) {
    return {
      props: {
        ...translation,
        error: "invalid_token",
      },
    }
  }

  const verifiedUser = await Database.User.findByPk(validToken.userId)
  if (!verifiedUser || verifiedUser.verified) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
  verifiedUser.verified = true
  await verifiedUser.save()
  await validToken.destroy()

  return {
    props: {
      ...translation,
      email: verifiedUser.email,
      firstName: verifiedUser.firstName,
    },
  }
}
