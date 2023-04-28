/** @type {import('next').NextConfig} */

const isGithubActions = process.env.GITHUB_ACTIONS || false


let basePath = ''

if (isGithubActions) {
  // trim off `<owner>/`
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')


  basePath = `/${repo}`
}


const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  basePath: basePath,
}

module.exports = nextConfig
