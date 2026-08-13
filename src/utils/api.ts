import { Category } from '../constants/categories'

type ApprovedPost = Record<string, any> & {
  strapi_id: string
  locale: string
  slug: string
  body_text: string
  title: string
  category: string
  created_at: string
  updated_at: string
  published_at: string
  hero_image: {
    data: {
      id: number
      attributes: { name: string; url: string }
    }
  }
}

const getBlogApiUrl = () => {
  if (typeof window !== 'undefined') return '/api/blog'

  const backendUrl = process.env.WEBSITE_API_URL
  if (!backendUrl) throw new Error('WEBSITE_API_URL is not configured')
  return `${backendUrl.replace(/\/$/, '')}/v1/blog`
}

async function fetchBlogApi(path: string, params: Record<string, any> = {}) {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, String(value))
    }
  })

  const queryString = query.toString()
  const response = await fetch(
    `${getBlogApiUrl()}${path}${queryString ? `?${queryString}` : ''}`,
    { cache: 'no-store' }
  )
  if (!response.ok) {
    throw new Error(`Blog API request failed with status ${response.status}`)
  }
  return response.json()
}

const toLegacyPost = (post: ApprovedPost) => {
  const attributes = {
    ...post,
    createdAt: post.created_at,
    updatedAt: post.updated_at,
    publishedAt: post.published_at,
  }
  return {
    id: Number(post.strapi_id),
    attributes,
  }
}

const usablePosts = (posts: ApprovedPost[]) =>
  posts.filter((post) => Boolean(post.slug))

export async function getHeroPosts(locale = 'en') {
  const { homepage } = await fetchBlogApi('/homepage/', { locale })
  return {
    description: homepage.description,
    seo: homepage.seo,
    hero_post: { data: toLegacyPost(homepage.hero_post) },
    sub_hero_first: { data: toLegacyPost(homepage.sub_hero_first) },
    sub_hero_second: { data: toLegacyPost(homepage.sub_hero_second) },
  }
}

export async function getPostsLatests(count: number, skip: number = 0) {
  const { posts, pagination } = await fetchBlogApi('/posts/', {
    limit: count,
    offset: skip,
    locale: 'en',
  })
  return {
    data: usablePosts(posts).map(toLegacyPost),
    meta: { pagination },
  }
}

export async function getPostsAll() {
  const pageSize = 100
  let offset = 0
  let total = 0
  const allPosts: ReturnType<typeof toLegacyPost>[] = []

  do {
    const { posts, pagination } = await fetchBlogApi('/posts/', {
      limit: pageSize,
      offset,
      locale: 'en',
    })
    allPosts.push(...usablePosts(posts).map(toLegacyPost))
    total = pagination.total
    if (!posts.length) break
    offset += posts.length
  } while (offset < total)

  return allPosts
}

export async function getPostsByCategory(
  category: Category,
  count: number,
  skip: number = 0
) {
  const { posts, pagination } = await fetchBlogApi('/posts/', {
    category,
    limit: count,
    offset: skip,
    locale: 'en',
  })
  return {
    data: usablePosts(posts).map(toLegacyPost),
    meta: { pagination },
  }
}

export async function getPostBySlug(slug: string, locale = 'en') {
  const { post } = await fetchBlogApi(`/posts/${encodeURIComponent(slug)}/`, {
    locale,
  })
  return toLegacyPost(post)
}
