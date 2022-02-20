import "../styles/globals.css"
import type { AppProps } from "next/app"

// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

// export default MyApp
import { appWithTranslation } from "next-i18next"

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
)

export default appWithTranslation(MyApp)
