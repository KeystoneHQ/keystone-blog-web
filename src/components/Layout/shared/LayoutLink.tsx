import Link from 'next/link'
import React from 'react'
import type { ComponentPropsWithoutRef } from 'react'

export interface LayoutLinkProps
  extends Omit<ComponentPropsWithoutRef<'a'>, 'href'> {
  href: string
}

export function isBlogHref(href: string) {
  return href.startsWith('/') && !href.startsWith('//')
}

export default function LayoutLink({
  href,
  target,
  rel,
  children,
  ...props
}: LayoutLinkProps) {
  if (isBlogHref(href)) {
    return (
      <Link href={href} target={target} rel={rel} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <a
      href={href}
      target={target}
      rel={target === '_blank' ? rel ?? 'noopener noreferrer' : rel}
      {...props}
    >
      {children}
    </a>
  )
}
