/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/support',
        destination: 'https://github.com/lalit2005/hyperdocs/issues/new',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/docs/:path*',
        destination: '/hyperdocs/docs/:path*',
      },
      {
        source: '/blog/:path*',
        destination: '/hyperdocs/blog/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
