// eslint disable-next-line @typescript-eslint/no-var-requires
const path = require("path")

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
    localePath: path.resolve("./public/locales"),
    domains: [
      {
        domain: "vercel.app",
        defaultLocale: "en",
      },
    ],
  },
}
