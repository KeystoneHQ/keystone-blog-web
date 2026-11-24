'use client'

import React, { useState } from 'react'
import Media from '@/components/Media'
import Popover from '@/components/Popover'
import { BLOG_HOME_PAGE } from '@/constants/links'
import { Share, ShareMediaContainer } from './index.style'
import Notification from '@/components/Notification'
import useIsMobile from '@/hooks/useMobile'
import type { BlogPost } from '@/types/blog'
import Image from 'next/image'

export default function ShareMedia({ post }: { post: BlogPost }) {
  const [isShowNotification, setIsShowNotification] = useState(false)
  const [message, setMessage] = useState('')
  const isMobile = useIsMobile()
  if (!isMobile) {
    return (
      <>
        <ShareMediaContainer>
          <Share>
            <span>SHARE</span>
          </Share>
          <Media
            url={`${BLOG_HOME_PAGE}/${post.slug}`}
            setIsShowNotification={() => setIsShowNotification(true)}
            setMessage={setMessage}
          />
        </ShareMediaContainer>
      
        {isShowNotification && (
          <Notification
            onClose={() => setIsShowNotification(false)}
            message={message}
            type="success"
          />
        )}
      </>
    )
  }
  return (
    <>
      <Popover
        placement="mobileShare"
        transition="slide bottom-10"
        trigger="click"
        content={
          <Media
            url={`${BLOG_HOME_PAGE}/${post.slug}`}
            setIsShowNotification={() => setIsShowNotification(true)}
            setMessage={setMessage}
          />
        }
      >
        <Share as="button" type="button" aria-label="Share this article">
          <span>Share</span>
          <picture>
            <Image
              src="/share.svg"
              className="default"
              alt=""
              width={20}
              height={20}
            />
            <Image
              src="/share-active.svg"
              className="active"
              alt=""
              width={20}
              height={20}
            />
          </picture>
        </Share>
      </Popover>
      {isShowNotification && (
        <Notification
          onClose={() => setIsShowNotification(false)}
          message={message}
          type="success"
        />
      )}
    </>
  )
}
