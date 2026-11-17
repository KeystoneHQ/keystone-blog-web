import React from 'react'
import type { SVGProps } from 'react'

export function ChevronIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path
        d="m4 6 4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m6 6 12 12M18 6 6 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export function ArrowUpIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m6 14 6-6 6 6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export function ArrowLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m15 18-6-6 6-6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true" {...props}>
      <path
        d="M9.879 9 6.166 5.287l1.061-1.06L12 9l-4.773 4.773-1.061-1.061L9.879 9Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 6C16.8807 6 18 4.88071 18 3.5C18 2.11929 16.8807 1 15.5 1C14.1193 1 13 2.11929 13 3.5C13 4.88071 14.1193 6 15.5 6ZM16.5 13.5V7.88849C16.1784 7.96147 15.8437 8 15.5 8C15.1563 8 14.8216 7.96147 14.5 7.88849V13.5H3.5V5.8149L8.32428 10.2372L9 10.8566L9.67572 10.2372L12.9671 7.22002C12.4109 6.84057 11.9442 6.33963 11.6051 5.75539L9 8.14343L5.02535 4.5H11.1115C11.0385 4.17839 11 3.84369 11 3.5C11 3.15631 11.0385 2.82161 11.1115 2.5H3.5H1.5V4.5V13.5V15.5H3.5H14.5H16.5V13.5Z"></path></svg>
  )
}

export function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 2.75a9.25 9.25 0 0 0-2.925 18.027c.463.086.632-.2.632-.446v-1.8c-2.572.559-3.115-1.091-3.115-1.091-.42-1.068-1.027-1.352-1.027-1.352-.84-.574.063-.562.063-.562.929.065 1.418.954 1.418.954.826 1.415 2.166 1.006 2.694.77.084-.598.323-1.006.588-1.237-2.053-.234-4.212-1.027-4.212-4.572 0-1.01.361-1.836.953-2.483-.095-.234-.413-1.175.091-2.448 0 0 .778-.249 2.544.948A8.85 8.85 0 0 1 12 7.146a8.84 8.84 0 0 1 2.316.312c1.765-1.197 2.542-.948 2.542-.948.505 1.273.187 2.214.092 2.448.593.647.952 1.473.952 2.483 0 3.554-2.163 4.335-4.222 4.564.332.287.627.852.627 1.718v2.608c0 .248.167.536.636.445A9.251 9.251 0 0 0 12 2.75Z"
        fill="currentColor"
      />
    </svg>
  )
}
