import React from 'react'
import type { MouseEvent } from 'react'
import { MailIcon } from '../shared/icons'
import { ContactTicketButton } from './index.style'
import messages from './messages/en'
import { contactTicketLink } from './navigation'

export default function ContactButton() {
  const handleMouseMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const xPercent = (
      ((event.clientX - rect.x) / rect.width) *
      100
    ).toFixed(2)
    const yPercent = (
      ((event.clientY - rect.y) / rect.height) *
      100
    ).toFixed(2)

    event.currentTarget.style.background =
      `radial-gradient(34.46% 148.73% at ${xPercent}% ${yPercent}%, ` +
      'rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), transparent'
  }

  const handleMouseLeave = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.background = 'transparent'
  }

  return (
    <ContactTicketButton
      href={contactTicketLink}
      target="_blank"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <MailIcon />
      {messages.raiseTicket}
    </ContactTicketButton>
  )
}
