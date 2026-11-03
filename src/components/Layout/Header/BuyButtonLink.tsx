'use client'

import React from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { BuyLink } from './index.style'

interface BuyButtonLinkProps {
  href: string
  children: ReactNode
}

export default function BuyButtonLink({ href, children }: BuyButtonLinkProps) {
  const updateGlowPosition = (event: MouseEvent<HTMLAnchorElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()

    event.currentTarget.style.setProperty(
      '--buy-glow-x',
      `${event.clientX - bounds.left}px`
    )
    event.currentTarget.style.setProperty(
      '--buy-glow-y',
      `${event.clientY - bounds.top}px`
    )
  }

  const resetGlowPosition = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.setProperty('--buy-glow-x', '50%')
    event.currentTarget.style.setProperty('--buy-glow-y', '50%')
  }

  return (
    <BuyLink
      href={href}
      onMouseMove={updateGlowPosition}
      onMouseLeave={resetGlowPosition}
    >
      <span>{children}</span>
    </BuyLink>
  )
}
