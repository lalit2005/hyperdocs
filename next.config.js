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
};

module.exports = nextConfig;
