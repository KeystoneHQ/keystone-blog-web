'use client'

import React, { useCallback, useMemo } from 'react'
import HeroModule from '@/components/HeroModule'
import CategoryModule from '@/components/CategoryModule'
import { Homepage } from '@/types/homePageType'
import { homepageConverter } from '../Layout/utils'
import { getPostsLatests } from '@/utils/api'
import Button from '../Button'
import Loading from '../Loading'
import { FooterLoadMore } from './All.style'
import useSWRInfinite from 'swr/infinite'

const POST_COUNT = 24

const getKey = (size: number, previousPageData: []) => {
  if (previousPageData && !previousPageData.length) return null
  return [size === 0 ? 0 : size * POST_COUNT]
}

export function AllCategories({ homepage }: { homepage: Homepage }) {
  const homepageModel = homepageConverter(homepage)

  const {
    data: list = [],
    size,
    setSize,
    isValidating
  } = useSWRInfinite(getKey, ([index]) => getPostsLatests(POST_COUNT, index).then((res) => res.data), {
    revalidateOnFocus: false,
    fallbackData: [homepage.latests],
  })

  const allPosts = useMemo(() => {
    return list.flat().filter(Boolean)
  }, [list])

  const totalPosts = homepage.pagination.total
  const hasMore = totalPosts > allPosts.length

  const loadMore = useCallback(async () => {
    if (isValidating) return
    await setSize(size + 1)
  }, [size, setSize, isValidating])

  return (
    <>
      <HeroModule
        heroPost={homepageModel.heroPost}
        subHeroFirst={homepageModel.subHeroFirst}
        subHeroSecond={homepageModel.subHeroSecond}
      />
      <CategoryModule
        category={'Latest articles'}
        posts={allPosts.map((it) => it.attributes)}
      />
      <FooterLoadMore>
        {isValidating ? (
          <Loading width='126px' height='10px' />
        ) : (
          <Button hidden={!hasMore} onClick={loadMore}>Load More</Button>
        )}
      </FooterLoadMore>
    </>
  )
}