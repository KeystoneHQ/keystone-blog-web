import React from 'react'
import readingTime from 'reading-time'
import { toPostDetail } from './utils'
import { getAllPosts, getPostBySlug } from '@/lib/blog/content'
import Content from './Content'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import type { BlogPost } from '@/types/blog'

const createBlogPostingSchema = (
  article: BlogPost,
  canonicalURL: string,
  summary: string
) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalURL },
  headline: article.title,
  description: summary || article.title,
  image: article.heroImage,
  author: { '@type': 'Person', name: 'Keystone Blog' },
  publisher: {
    '@type': 'Organization',
    name: 'Keystone',
    logo: {
      '@type': 'ImageObject',
      url: 'https://keyst.one/assets/keystone-logo-k6ycS1NB.webp',
    },
  },
  datePublished: article.publishedAt,
  dateModified: article.updatedAt,
  isAccessibleForFree: true,
})

export function generateMetadata({
  params,
}: {
  params: Promise<{ post: string }>
}): Promise<Metadata> {
  return params.then(({ post }) => {
    const article = getPostBySlug(post)
    if (!article) return {}

    const postModel = toPostDetail(article)
    return {
      title: postModel.seo.title,
      description: postModel.seo.description,
      alternates: { canonical: postModel.seo.canonicalURL },
      openGraph: {
        siteName: 'Keystone\'s Blog',
        type: 'article',
        title: postModel.seo.title,
        description: postModel.seo.description,
        images: [postModel.heroImage.url],
        url: postModel.seo.canonicalURL,
      },
    }
  })
}

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ post: slug }))
}

export default async function PostDetail({
  params,
}: {
  params: Promise<{ post: string }>
}) {
  const { post } = await params
  const article = getPostBySlug(post)
  if (!article) notFound()

  const postModel = toPostDetail(article)
  const minutesToRead = Math.ceil(readingTime(article.body).minutes)
  const schema = createBlogPostingSchema(
    article,
    postModel.seo.canonicalURL,
    postModel.seo.description
  )

  return (
    <>
      <Script
        id="blog-posting-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
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
