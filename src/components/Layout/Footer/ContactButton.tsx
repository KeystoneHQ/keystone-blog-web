import React from 'react'
import { MailIcon } from '../shared/icons'
import { ContactTicketButton } from './index.style'
import messages from './messages/en'
import { contactTicketLink } from './navigation'

export default function ContactButton() {
  return (
    <ContactTicketButton href={contactTicketLink} target="_blank">
      <MailIcon />
      {messages.raiseTicket}
    </ContactTicketButton>
  )
}
