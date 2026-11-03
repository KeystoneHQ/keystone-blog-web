'use client'

import React from 'react'
import { ArrowUpIcon } from '../shared/icons'
import { BackToTopButton } from './index.style'
import messages from './messages/en'

export default function BackToTop() {
  return (
    <BackToTopButton
      type="button"
      aria-label={messages.backToTop}
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
    >
      <ArrowUpIcon />
    </BackToTopButton>
  )
}
