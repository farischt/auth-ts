import Head from "next/head"
import Link from "next/link"
import { useTranslation } from "next-i18next"

import type { LoggedInUser } from "types"
import LogoutForm from "components/forms/LogoutForm"

type HomePageProps = {
  user: LoggedInUser | null
}

export default function HomePage({ user }: HomePageProps) {
  const { t } = useTranslation("common")

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Authentication System</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          {t("pages.home.greetingStart")} {user && user.firstName}
          <a
            className="text-blue-600"
            href="https://github.com/Farischt/auth-ts"
          >
            {t("pages.home.greetingEnd")}
          </a>
        </h1>

        <div className="mt-3">{user && <LogoutForm />}</div>

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          {!user && (
            <>
              <Link href="/auth/login">
                <a className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
                  <h3 className="text-2xl font-bold">
                    {t("pages.home.links.login.title")} &rarr;
                  </h3>
                  <p className="mt-4 text-xl">
                    {t("pages.home.links.login.description")}
                  </p>
                </a>
              </Link>

              <Link href="/auth/register">
                <a className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
                  <h3 className="text-2xl font-bold">
                    {t("pages.home.links.register.title")} &rarr;
                  </h3>
                  <p className="mt-4 text-xl">
                    {t("pages.home.links.register.description")}
                  </p>
                </a>
              </Link>
            </>
          )}

          <a
            href="https://nextjs.org/docs"
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Documentation &rarr;</h3>
            <p className="mt-4 text-xl">
              Find in-depth information about Next.js features and API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn"
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Learn &rarr;</h3>
            <p className="mt-4 text-xl">
              Learn about Next.js in an interactive course with quizzes!
            </p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Examples &rarr;</h3>
            <p className="mt-4 text-xl">
              Discover and deploy boilerplate example Next.js projects.
            </p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Deploy &rarr;</h3>
            <p className="mt-4 text-xl">
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="ml-2 h-4" />
        </a>
      </footer>
    </div>
  )
}

import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import Server from "server/lib"

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
