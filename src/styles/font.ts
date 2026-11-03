import localFont from 'next/font/local'

export const open_sans = localFont({
  src: [
    {
      path: './fonts/open-sans-400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/open-sans-600.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-open-sans',
  display: 'swap',
})

export const mont_serrat = localFont({
  src: [
    {
      path: './fonts/montserrat-400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/montserrat-600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/montserrat-700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-montserrat',
  display: 'swap',
})
