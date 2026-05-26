import React from 'react'
import readingTime from 'reading-time'
import { postConverter } from './utils'
import { fetchAPI, getPostsAll } from '@/utils/api'
import Content from './Content'
import { Metadata, ResolvingMetadata } from 'next'
import { Post } from '@/types/postDetailPageType'
import Script from 'next/script'

// 强制动态渲染，禁用缓存
export const dynamic = 'force-dynamic'
export const revalidate = 0

const formatISODate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toISOString().replace('Z', '+08:00')
}

const createBlogPostingSchema = (article: Post, canonicalURL: string, summary: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalURL,
    },
    headline: article.title,
    description: summary || article.title,
    image: article.hero_image.data.attributes.url,
    author: {
      '@type': 'Person',
      name: 'Keystone Blog',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Keystone',
      logo: {
        '@type': 'ImageObject',
        url: 'https://keyst.one/assets/keystone-logo-k6ycS1NB.webp',
      },
    },
    datePublished: formatISODate(article.publishedAt),
    dateModified: formatISODate(article.updatedAt),
    isAccessibleForFree: true,
  }
}

export async function generateMetadata(
  { params }: { params: { post: string } },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { post } = params
  const articlesRes = await fetchAPI('/posts', {
    filters: {
      slug: post,
    },
    populate: {
      hero_image: {
        fields: ['name', 'url'],
      },
    },
  })

  const article = articlesRes.data[0]

  if (!article) {
    return {}
  }

  const postModel = postConverter(article.attributes)

  return {
    title: postModel.seo.title,
    description: postModel.seo.description,
    alternates: {
      canonical: postModel.seo.canonicalURL,
    },
    openGraph: {
      siteName: 'Keystone\'s Blog',
      type: 'article',
      title: postModel.seo.title,
      description: postModel.seo.description,
      images: [postModel.heroImage.url],
      url: postModel.seo.canonicalURL,
    },
  }
}

export async function generateStaticParams() {
  const postAll = await getPostsAll()
  const routes = postAll.map((it) => ({ post: it.attributes.slug }))
  return routes
}

export default async function PostDetail({
  params,
}: {
  params: {
    post: string
  }
}) {
  const { post } = params
  const articlesRes = await fetchAPI('/posts', {
    filters: {
      slug: post,
    },
    populate: {
      hero_image: {
        fields: ['name', 'url'],
      },
    },
  })

  if (!articlesRes.data[0]) {
    return {
      errorCode: 404,
    }
  }

  const article = articlesRes.data[0]

  const postModel = postConverter(article.attributes)
  const minutesToRead = Math.ceil(readingTime(postModel.bodyText).minutes)
  const schema = createBlogPostingSchema(
    article.attributes,
    postModel.seo.canonicalURL,
    postModel.summary
  )

  return (
    <>
      <Script
        id="blog-posting-schema"
        type="application/ld+json"
        strategy='beforeInteractive'
      >
        {JSON.stringify(schema)}
      </Script>
      <Content
        article={article}
        postModel={postModel}
        minutesToRead={minutesToRead}
      />
    </>
  )
}
