/** @type {import('next').NextConfig} */

//### Localhost
//# http://localhost:4444
//# http://localhost:3000
//# localhost

// ### 127.0.0.1
//# BASE_URL: 'http://127.0.0.1:4000',
//# BASE_URL_FRONTEND: 'http://127.0.0.1:3000',
//# 127.0.0.1

//### PROD
//# BASE_URL: 'https://back.chf.edgiek.space',
//# BASE_URL_FRONTEND: 'https://chf.edgiek.space',
//# back.chf.edgiek.space


const nextConfig = {
  env: {
    walletconnectId: "4128e1b3919d2461f1dfff9b61fd6d76",
    NFT_STORAGE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDZkZjBBNDIyNjZkZDMwMTY3RmZlYkE4MEQxNTA1NmM4NGI5NzdCOEYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NjUxNDcyMTM5MywibmFtZSI6ImNoZiJ9.wK1elOomcJAi8dEYgoqEGlHHwYDGxiAlykyledxmxDA',
    BASE_URL: 'https://back.chf.edgiek.space',
    BASE_URL_FRONTEND: 'https://chf.edgiek.space',

    SIGNATURE_TEXT:
      "Greetings, this is Crypto Hedge Fund. We kindly request you to sign your signature to access your account. Thank you for choosing our services.",
    },
  reactStrictMode: true,
  images: {
    domains: ['back.chf.edgiek.space'],
  }
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)