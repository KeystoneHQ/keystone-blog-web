import React from 'react'
import { render, screen } from '@testing-library/react'
import LayoutLink from './LayoutLink'

describe('LayoutLink', () => {
  it('renders Blog routes as normal links', () => {
    render(<LayoutLink href="/article">Article</LayoutLink>)

    expect(screen.getByRole('link', { name: 'Article' }).getAttribute('href')).toBe('/article')
  })

  it('renders absolute and protocol links unchanged', () => {
    const { rerender } = render(
      <LayoutLink href="https://keyst.one">Keystone</LayoutLink>
    )

    expect(screen.getByRole('link', { name: 'Keystone' }).getAttribute('href')).toBe(
      'https://keyst.one'
    )

    rerender(
      <LayoutLink href="mailto:support@keyst.one">Support</LayoutLink>
    )
    expect(screen.getByRole('link', { name: 'Support' }).getAttribute('href')).toBe(
      'mailto:support@keyst.one'
    )
  })

  it('protects links that open a new window', () => {
    render(
      <LayoutLink href="https://keyst.one" target="_blank">
        Keystone
      </LayoutLink>
    )

    expect(screen.getByRole('link', { name: 'Keystone' }).getAttribute('rel')).toBe(
      'noopener noreferrer'
    )
  })
})
