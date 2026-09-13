/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  serverExternalPackages: ['@supabase/supabase-js'],
}

module.exports = nextConfig
