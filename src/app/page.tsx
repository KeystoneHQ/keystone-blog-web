import React from 'react'
import Script from 'next/script'
import { getHomepageContent } from '@/lib/blog/content'
import HomeLayout from '@/components/Layout/home'
import { AllCategories } from '@/components/HomeCategories/All'
import { BLOG_HOME_PAGE } from '../constants/links'
import type { Metadata } from 'next'

const HOME_PAGE_TITLE = 'Keystone\'s Blog'

const createHomePageSchema = (description: string) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Blog',
      '@id': `${BLOG_HOME_PAGE}/#blog`,
      name: 'Keystone Hardware Wallet Blog',
      description,
      url: `${BLOG_HOME_PAGE}/`,
      inLanguage: 'en',
      publisher: { '@id': 'https://keyst.one/#organization' },
    },
    {
      '@type': 'Organization',
      '@id': 'https://keyst.one/#organization',
      name: 'Keystone',
      url: 'https://keyst.one/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://keyst.one/assets/keystone-logo-k6ycS1NB.webp',
      },
      sameAs: [
        'https://twitter.com/KeystoneWallet',
        'https://github.com/KeystoneHQ',
      ],
    },
  ],
})

export function generateMetadata(): Metadata {
  const homepage = getHomepageContent()
  return {
    title: HOME_PAGE_TITLE,
    description: homepage.description,
    alternates: { canonical: BLOG_HOME_PAGE },
    openGraph: {
      title: HOME_PAGE_TITLE,
      description: homepage.description,
      images: [`${BLOG_HOME_PAGE}/images/homepage.png`],
      url: BLOG_HOME_PAGE,
    },
  }
}

export default function Home() {
  const homepage = getHomepageContent()
  const schema = createHomePageSchema(homepage.description)

  return (
    <>
      <Script
        id="home-page-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(schema)}
      </Script>
      <HomeLayout description={homepage.description}>
        <AllCategories homepage={homepage} />
      </HomeLayout>
    </>
  )
}
