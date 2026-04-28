'use client'

import React, { useState } from 'react'
import Media from '@/components/Media'
import { BLOG_HOME_PAGE } from '@/constants/links'
import { Share, ShareMediaContainer } from './index.style'
import Notification from '@/components/Notification'

export default function ShareMedia({ post }: { post: any }) {
  const [isShowNotification, setIsShowNotification] = useState(false)
  const [message, setMessage] = useState('')

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
