import React from 'react'
import { notFound } from 'next/navigation'
import { getHomepageContent, getPostsByCategory } from '@/lib/blog/content'
import HomeLayout from '@/components/Layout/home'
import { OtherCategories } from '@/components/HomeCategories/Other'
import { BLOG_HOME_PAGE } from '@/constants/links'
import type { Metadata } from 'next'
import {
  BLOG_CATEGORY_NAMES,
  BLOG_CATEGORY_SLUGS,
} from '@/types/blog'
import type { BlogCategorySlug } from '@/types/blog'

interface CategoriesPageProps {
  params: Promise<{ category: string }>
}

const isCategorySlug = (value: string): value is BlogCategorySlug =>
  BLOG_CATEGORY_SLUGS.includes(value as BlogCategorySlug)

export async function generateMetadata({
  params,
}: CategoriesPageProps): Promise<Metadata> {
  const { category } = await params
  if (!isCategorySlug(category)) return {}
  const title = BLOG_CATEGORY_NAMES[category]
  const description = getHomepageContent().description
  const categoryURL = `${BLOG_HOME_PAGE}/categories/${category}`

  return {
    title: `${title} | Keystone's Blog`,
    description,
    alternates: { canonical: categoryURL },
    openGraph: {
      siteName: 'Keystone\'s Blog',
      type: 'article',
      title,
      description,
      images: [`${BLOG_HOME_PAGE}/images/homepage.png`],
      url: categoryURL,
    },
  }
}

export function generateStaticParams() {
  return BLOG_CATEGORY_SLUGS.map((category) => ({ category }))
}

export default async function CategoryPage({ params }: CategoriesPageProps) {
  const { category } = await params
  if (!isCategorySlug(category)) notFound()

  const title = BLOG_CATEGORY_NAMES[category]
  const posts = getPostsByCategory(category)
  const description = getHomepageContent().description

  return (
    <HomeLayout description={description}>
      <OtherCategories title={title} posts={posts} />
    </HomeLayout>
  )
}
