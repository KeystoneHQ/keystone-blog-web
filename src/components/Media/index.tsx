import React, { FC } from 'react'
import { MediaWrapper } from './index.style'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  RedditShareButton,
} from 'react-share'
import Image from 'next/image'

interface MediaProps {
  url: string,
  setIsShowNotification: Function,
  setMessage: Function,
}

const Media: FC<MediaProps> = ({ url, setIsShowNotification, setMessage }) => {
  const copyLink = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setIsShowNotification()
        setMessage('Link copied!')
      })
      .catch(() => {
        setIsShowNotification()
        setMessage('Copy link failed!')
      })
  }
  return (
    <MediaWrapper>
      <TelegramShareButton url={url}>
        <span className="icon-swap">
          <Image className="icon-default" src="/telegram-deactive-circle.svg" alt="telegram" width={24} height={24} />
          <Image className="icon-active" src="/telegram-circle.svg" alt="telegram" width={24} height={24} />
        </span>
      </TelegramShareButton>
      <TwitterShareButton url={url}>
        <span className="icon-swap">
          <Image className="icon-default" src="/twitter-deactive-circle.svg" alt="twitter" width={24} height={24} />
          <Image className="icon-active" src="/twitter-circle.svg" alt="twitter" width={24} height={24} />
        </span>
      </TwitterShareButton>
      <FacebookShareButton url={url}>
        <span className="icon-swap">
          <Image className="icon-default" src="/facebook-deactive-circle.svg" alt="facebook" width={24} height={24} />
          <Image className="icon-active" src="/facebook-circle.svg" alt="facebook" width={24} height={24} />
        </span>
      </FacebookShareButton>
      <LinkedinShareButton url={url}>
        <span className="icon-swap">
          <Image className="icon-default" src="/linkedin-deactive-circle.svg" alt="linkedin" width={24} height={24} />
          <Image className="icon-active" src="/linkedin-circle.svg" alt="linkedin" width={24} height={24} />
        </span>
      </LinkedinShareButton>
      <button type="button" className="icon-button" onClick={copyLink} aria-label="copy link">
        <span className="icon-swap">
          <Image className="icon-default" src="/link-deactive-circle.svg" alt="copy link" width={24} height={24} />
          <Image className="icon-active" src="/link-circle.svg" alt="copy link" width={24} height={24} />
        </span>
      </button>
    </MediaWrapper>
  )
}

export default Media
