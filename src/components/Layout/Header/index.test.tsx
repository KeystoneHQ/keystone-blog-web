import React from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import Header from '.'
import FeatureMenu from './FeatureMenu'
import LearnMenu from './LearnMenu'
import PartnershipMenu from './PartnershipMenu'

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Header', () => {
  it('uses absolute URLs for the main site and shop', () => {
    render(<Header />)

    expect(
      screen.getByRole('link', { name: 'Keystone home' }).getAttribute('href')
    ).toBe('https://keyst.one')
    const buyLink = screen.getByRole('link', { name: 'BUY' })
    expect(buyLink.getAttribute('href')).toBe('https://keyst.one/shop')

    jest.spyOn(buyLink, 'getBoundingClientRect').mockReturnValue({
      x: 10,
      y: 5,
      left: 10,
      top: 5,
      width: 100,
      height: 32,
      right: 110,
      bottom: 37,
      toJSON: () => ({}),
    })
    fireEvent.mouseMove(buyLink, { clientX: 35, clientY: 17 })

    expect(buyLink.style.getPropertyValue('--buy-glow-x')).toBe('25px')
    expect(buyLink.style.getPropertyValue('--buy-glow-y')).toBe('12px')
  })

  it('exposes and opens the Products menu', () => {
    render(<Header />)

    const button = screen.getByRole('button', { name: 'Products' })
    expect(button.getAttribute('aria-expanded')).toBe('false')

    fireEvent.click(button)

    expect(button.getAttribute('aria-expanded')).toBe('true')
    expect(
      screen.getByRole('link', { name: 'Keystone 3 Pro' }).getAttribute('href')
    ).toBe('https://keyst.one/shop/products/keystone-3-pro')
  })

  it('renders product badges and updates the animated preview on hover', () => {
    render(<Header />)

    fireEvent.click(screen.getByRole('button', { name: 'Products' }))

    const productLink = screen.getByRole('link', { name: 'Keystone 3 Pro' })
    expect(within(productLink).getByText('Hot')).toBeTruthy()
    expect(productLink.querySelector('svg')).toBeTruthy()
    expect(
      screen.getByTestId('product-preview').getAttribute('data-product-id')
    ).toBe('keystone-3-pro')

    fireEvent.mouseEnter(
      screen.getByRole('link', { name: 'Keystone 3 Pro NFT Customization' })
    )

    expect(
      screen.getByTestId('product-preview').getAttribute('data-product-id')
    ).toBe('nft-customization')
  })

  it('renders the full-resolution feature image and feature arrows', () => {
    render(<FeatureMenu />)

    const supportedWallets = screen.getByRole('link', {
      name: /Supported Wallets & Coins/,
    })
    const image = supportedWallets.querySelector('img')

    expect(image?.getAttribute('width')).toBe('760')
    expect(image?.getAttribute('height')).toBe('416')
    expect(supportedWallets.querySelector('svg')).toBeTruthy()
    expect(
      screen.getByRole('link', { name: 'Firmware' }).querySelector('svg')
    ).toBeTruthy()
  })

  it('renders the Learn resources and basic information with link arrows', () => {
    const { container } = render(<LearnMenu />)

    const getStarted = screen.getByRole('link', { name: 'Get started' })
    const basicInformation = screen.getByRole('heading', {
      name: 'Basic Information',
    })
    const blog = container.querySelector('a[href="/"]')
    const article = screen.getByRole('link', {
      name: 'What is a Crypto Wallet',
    })

    expect(getStarted.querySelector('img')).toBeTruthy()
    expect(getStarted.querySelector('svg')).toBeTruthy()
    expect(basicInformation).toBeTruthy()
    expect(blog?.textContent).toContain('Blog')
    expect(article.querySelector('svg')).toBeTruthy()
  })

  it('renders the complete partnership menu with link arrows', () => {
    render(<PartnershipMenu />)

    const affiliate = screen.getByRole('link', { name: /Affiliate Program/ })
    const zcash = screen.getByRole('link', { name: /Zcash/ })
    const more = screen.getByRole('link', { name: 'More' })

    expect(affiliate.getAttribute('href')).toBe('https://keyst.one/affiliates')
    expect(affiliate.querySelector('img')).toBeTruthy()
    expect(affiliate.querySelector('svg')).toBeTruthy()
    expect(zcash.getAttribute('href')).toBe('https://keyst.one/zcash')
    expect(zcash.querySelector('img')).toBeTruthy()
    expect(zcash.querySelector('svg')).toBeTruthy()
    expect(more.getAttribute('href')).toBe(
      'https://keyst.one/shop/products/keystone-3-pro-limited'
    )
    expect(more.querySelector('svg')).toBeTruthy()
  })

  it('uses the main-site drill-down flow for mobile navigation', () => {
    render(<Header />)

    const openButton = document.querySelector<HTMLButtonElement>(
      'button[aria-label="Open menu"]'
    )
    expect(openButton).toBeTruthy()
    fireEvent.click(openButton as HTMLButtonElement)
    expect(document.body.style.overflow).toBe('hidden')

    const panel = document.getElementById('mobile-navigation')
    expect(panel).toBeTruthy()

    const primaryList = panel?.querySelector('ul')
    const primaryLabels = Array.from(primaryList?.children ?? []).map(
      (item) => item.firstElementChild?.textContent
    )

    expect(primaryLabels).toEqual([
      'Products',
      'App',
      'Coins & Features',
      'Learn',
      'Partnerships',
    ])

    fireEvent.click(
      within(panel as HTMLElement).getByRole('button', { name: 'Learn' })
    )

    expect(screen.getByTestId('mobile-section-title').textContent).toBe('Learn')
    const backButton = document.querySelector<HTMLButtonElement>(
      'button[aria-label="Back to mobile menu"]'
    )
    expect(backButton).toBeTruthy()
    expect(
      within(panel as HTMLElement).queryByRole('button', { name: 'Products' })
    ).toBeNull()

    fireEvent.click(backButton as HTMLButtonElement)
    expect(
      within(panel as HTMLElement).getByRole('button', { name: 'Products' })
    ).toBeTruthy()

    const closeButton = document.querySelector<HTMLButtonElement>(
      'button[aria-label="Close menu"]'
    )
    fireEvent.click(closeButton as HTMLButtonElement)
    expect(document.getElementById('mobile-navigation')).toBeNull()
    expect(document.body.style.overflow).toBe('')
  })
})
