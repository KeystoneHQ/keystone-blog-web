import React from 'react'
import Script from 'next/script'
import { getHeroPosts, getPostsAll, getPostsLatests } from '@/utils/api'
import { Homepage } from '@/types/homePageType'
import HomeLayout from '@/components/Layout/home'
import { AllCategories } from '@/components/HomeCategories/All'
import { BLOG_HOME_PAGE, IMAGE_CDN } from '../constants/links'
import { Metadata, ResolvingMetadata } from 'next'

const HOME_PAGE_TITLE = 'Keystone\'s Blog'

const createHomePageSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${BLOG_HOME_PAGE}/#blog`,
        name: 'Keystone Hardware Wallet Blog',
        description: 'Latest news, development and security tips to safeguard your crypto assets with Keystone.',
        url: `${BLOG_HOME_PAGE}/`,
        inLanguage: 'en',
        publisher: {
          '@id': 'https://keyst.one/#organization',
        },
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
  }
}

const getPosts = async (): Promise<Homepage> => {
  const POST_COUNT = 24
  const heroPosts = await getHeroPosts()
  const { data: latests, meta: { pagination } } = await getPostsLatests(POST_COUNT)
  try {
    return {
      description: heroPosts.description,
      heroPost: heroPosts.hero_post.data,
      subHeroFirst: heroPosts.sub_hero_first.data,
      subHeroSecond: heroPosts.sub_hero_second.data,
      latests,
      pagination,
    }
  } catch (error) {
    console.error('An error occurred:', error)
    return {
      description: '',
      heroPost: null,
      subHeroFirst: null,
      subHeroSecond: null,
      latests: [],
      pagination: {},
    }
  }
}

export async function generateMetadata(
  _params: any,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const homepage = await getPosts()

  return {
    title: HOME_PAGE_TITLE,
    description: homepage.description,
    alternates: {
      canonical: BLOG_HOME_PAGE,
    },
    openGraph: {
      title: HOME_PAGE_TITLE,
      description: homepage.description,
      images: [`${IMAGE_CDN}/homepage.png`],
      url: BLOG_HOME_PAGE,
    },
  }
}

export default async function Home() {
  const homepage = await getPosts()
  const schema = createHomePageSchema()
  const allPosts = await getPostsAll()
  const post = allPosts.map((it) => {
    return {
      url: `${BLOG_HOME_PAGE}/${it.attributes.slug}`,
    }
  })
  return (
    <>
      <Script
        id="home-page-schema"
        type="application/ld+json"
        strategy='beforeInteractive'
      >
        {JSON.stringify(schema)}
      </Script>
      <div style={{ display: 'none' }}>
        {post.map((it) => (
          <a key={it.url} href={it.url}>{it.url}</a>
        ))}
      </div>
      <HomeLayout description={homepage.description}>
        <AllCategories homepage={homepage} />
      </HomeLayout>
    </>
  )
}
