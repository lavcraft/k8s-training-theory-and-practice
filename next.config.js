const isProduction = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: isProduction ? '/k8s-training-theory-and-practice/' : '',
  basePath: isProduction ? '/k8s-training-theory-and-practice': '',
}

module.exports = nextConfig
