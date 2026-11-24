import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import ShareMedia from './ShareMedia'
import type { BlogPost } from '@/types/blog'

jest.mock('@/hooks/useMobile', () => () => true)

const post = {
  slug: 'test-post',
} as BlogPost

describe('mobile post sharing', () => {
  it('renders the share icon and opens the sharing popover on click', () => {
    render(<ShareMedia post={post} />)

    const shareButton = screen.getByRole('button', {
      name: 'Share this article',
    })

    expect(shareButton.querySelector('img')).toBeTruthy()
    expect(shareButton.getAttribute('aria-expanded')).toBe('false')
    expect(
      screen.queryByRole('button', { name: 'Share on Telegram' })
    ).toBeNull()

    fireEvent.click(shareButton)

    expect(shareButton.getAttribute('aria-expanded')).toBe('true')
    expect(
      screen.getByRole('button', { name: 'Share on Telegram' })
    ).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Share on X' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'copy link' })).toBeTruthy()
  })
})
