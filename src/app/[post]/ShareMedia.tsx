'use client'

import React, { useState } from 'react'
import Media from '@/components/Media'
import Popover from '@/components/Popover'
import { BLOG_HOME_PAGE } from '@/constants/links'
import { Share, ShareMediaContainer } from './index.style'
import Notification from '@/components/Notification'
import useIsMobile from '@/hooks/useMobile'

export default function ShareMedia({ post }: { post: any }) {
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
            url={`${BLOG_HOME_PAGE}/${post.attributes.slug}`}
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
        placement="bottomRight"
        transition="slide bottom-10"
        content={
          <Media
            url={`${BLOG_HOME_PAGE}/${post.attributes.slug}`}
            setIsShowNotification={() => setIsShowNotification(true)}
            setMessage={setMessage}
          />
        }
      >
        <Share>
          <span>Share</span>
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
