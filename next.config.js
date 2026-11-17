const cdnDomain = process.env.NEXT_PUBLIC_CDN_DOMAIN || 'keyst.one'

module.exports = {
  transpilePackages: ['marked', 'marked-alert'],
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: cdnDomain,
        pathname: '**',
      },
    ],
  },
}
