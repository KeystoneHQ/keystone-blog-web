import React from 'react'
import Image from 'next/image'
import { ArrowRightIcon } from '../shared/icons'
import messages from './messages/en'
import { blogItems, learnItems, mobileLearnItem } from './navigation'
import {
  LearnBasicInfo,
  LearnBasicLink,
  LearnBasicList,
  LearnBasicTitle,
  LearnBlogContent,
  LearnBlogDescription,
  LearnBlogLink,
  LearnBlogPromo,
  LearnBlogTitle,
  LearnDivider,
  LearnLayout,
  LearnLinkArrow,
  LearnResourceItem,
  LearnResourceLink,
  LearnResourceList,
} from './index.style'

export default function LearnMenu() {
  const resources = [mobileLearnItem, ...learnItems]

  return (
    <LearnLayout>
      <LearnResourceList>
        {resources.map((item) => (
          <LearnResourceItem
            key={item.id}
            $mobileOnly={item.id === mobileLearnItem.id}
          >
            <LearnResourceLink href={item.href} target={item.target}>
              {item.icon && (
                <Image src={item.icon} alt="" width={48} height={48} />
              )}
              <span>{item.label}</span>
              <LearnLinkArrow aria-hidden="true">
                <ArrowRightIcon />
              </LearnLinkArrow>
            </LearnResourceLink>
          </LearnResourceItem>
        ))}
      </LearnResourceList>

      <LearnDivider aria-hidden="true" />

      <LearnBlogContent>
        <LearnBlogPromo>
          <Image src={mobileLearnItem.icon!} alt="" width={66} height={66} />
          <LearnBlogLink href={mobileLearnItem.href}>
            <LearnBlogTitle>
              <span>{mobileLearnItem.label}</span>
              <LearnLinkArrow aria-hidden="true">
                <ArrowRightIcon />
              </LearnLinkArrow>
            </LearnBlogTitle>
            <LearnBlogDescription>
              {messages.blogDescription}
            </LearnBlogDescription>
          </LearnBlogLink>
        </LearnBlogPromo>

        <LearnBasicInfo>
          <LearnBasicTitle>{messages.basicInformation}</LearnBasicTitle>
          <LearnBasicList>
            {blogItems.map((item) => (
              <li key={item.id}>
                <LearnBasicLink href={item.href}>
                  <span>{item.label}</span>
                  <LearnLinkArrow aria-hidden="true">
                    <ArrowRightIcon />
                  </LearnLinkArrow>
                </LearnBasicLink>
              </li>
            ))}
          </LearnBasicList>
        </LearnBasicInfo>
      </LearnBlogContent>
    </LearnLayout>
  )
}
