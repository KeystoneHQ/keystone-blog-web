import React, { ReactNode } from 'react'
import { GoogleTagManager } from '@next/third-parties/google'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <GoogleTagManager gtmId="G-WCBLWW84S2" />
    </>
  )
}
