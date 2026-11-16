'use client'

import React from 'react'
import {
  ArticleContainer,
  BackToHome,
  BackToHomeAndShare,
  BackToHomeContainer,
  BodyContainer,
  BodyText,
  Category,
  PostContainer,
  PostInfo,
  PublishTime,
  PublishTimeAndReadingTime,
  ReadingTime,
  Summary,
  SummaryContent,
  SummaryTitle,
  TableOfContentsContainer,
  TableOfContentsLi,
  TableOfContentsLink,
  TableOfContentsUl,
  Title,
  TopBanner,
} from './index.style'
import Image from 'next/image'
import MainSiteModule from '@/components/MainSiteModule'
import { CATEGORY_COLOR_MAPPER } from '@/constants/categories'
import ShareMedia from './ShareMedia'
import type { HeadingItem } from './utils/markdown'
import useIsMobile from '@/hooks/useMobile'
import type { BlogPost } from '@/types/blog'
import type { PostDetailModel } from '@/types/postDetailPageType'

const TableOfContents = ({ headings }: { headings: HeadingItem[] }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return (
    <TableOfContentsContainer>
      <TableOfContentsUl>
        {headings.map((heading) => (
          <TableOfContentsLi key={heading.slug} depth={heading.depth}>
            <TableOfContentsLink
              href={`#${heading.slug}`} 
              onClick={(e) => handleClick(e, heading.slug)}
              depth={heading.depth}
            >
              {heading.text}
            </TableOfContentsLink>
          </TableOfContentsLi>
        ))}
      </TableOfContentsUl>
    </TableOfContentsContainer>
  );
}

interface ContentProps {
  article: BlogPost
  postModel: PostDetailModel
  minutesToRead: number
}

export default function Content({
  article,
  postModel,
  minutesToRead,
}: ContentProps) {
  const isMobile = useIsMobile();
  return (
    <PostContainer>
      <TopBanner>
        <PostInfo>
          <Category
            color={CATEGORY_COLOR_MAPPER[article.category].fontColorInDarkBg}
          >
            {postModel.category}
          </Category>
          <Title>{postModel.title}</Title>
          <PublishTimeAndReadingTime>
            <PublishTime>{postModel.publishTime}</PublishTime>
            <Image src="/vector.svg" alt="divider" width={2} height={18} />
            <ReadingTime>{minutesToRead} mins read</ReadingTime>
          </PublishTimeAndReadingTime>
        </PostInfo>
        <picture>
          <img
            src={postModel.heroImage.url}
            alt={postModel.heroImage.alt}
            width="600"
            height="334"
          />
        </picture>
      </TopBanner>
      <BodyContainer>
        {isMobile ? null : <TableOfContents headings={postModel.headings} />}
        <ArticleContainer>
          <BackToHomeAndShare>
            <BackToHomeContainer>
              <BackToHome href="/">
                <span>Blog Home</span>
              </BackToHome>
              <picture>
                <img
                  src="/banner-arrow.svg"
                  alt="banner-arrow"
                  width={20}
                  height={20}
                />
              </picture>
              <BackToHome href={`/categories/${postModel.categorySlug}`}>
                <span>{postModel.category}</span>
              </BackToHome>
            </BackToHomeContainer>
            {isMobile && <ShareMedia post={article} />}
          </BackToHomeAndShare>
          {postModel.summary && (
            <Summary>
              <SummaryTitle>Summary</SummaryTitle>
              <SummaryContent>{postModel.summary}</SummaryContent>
            </Summary>
          )}
          <BodyText>
            <div
              dangerouslySetInnerHTML={{
                __html: postModel.bodyHtml,
              }}
            />
          </BodyText>
          <MainSiteModule />
        </ArticleContainer>
        {!isMobile && <ShareMedia post={article} />}
      </BodyContainer>
    </PostContainer>
  )
}
