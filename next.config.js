const { i18n } = require("./next-i18next.config")
console.log(i18n)

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n,
}
