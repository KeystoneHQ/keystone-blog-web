import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Footer from '.'
import { footerGroups, paymentMethods, socialLinks } from './navigation'

describe('Footer', () => {
  it('renders the current main-site brand and contact information', () => {
    render(<Footer />)

    expect(screen.getByText(/The Only Hardware Wallet/).textContent).toContain(
      'You\'ll Ever Need.'
    )
    expect(screen.getByText('Support email')).toBeTruthy()
    expect(
      screen
        .getByRole('link', { name: 'support@keyst.one' })
        .getAttribute('href')
    ).toBe('mailto:support@keyst.one')
    expect(screen.getByText(/19H MAXGRAND PLAZA/).textContent).toContain(
      'Hong Kong'
    )
    expect(screen.getByText('Payment methods')).toBeTruthy()
    expect(screen.getAllByTestId('payment-method')).toHaveLength(
      paymentMethods.length
    )
    expect(
      screen.getByRole('link', { name: 'Raise a Ticket' }).getAttribute('href')
    ).toBe('https://keystonewallet.atlassian.net/servicedesk/customer/portal/1')
    expect(screen.queryByText('Contact us')).toBeNull()
  })

  it('uses the latest main-site navigation content and responsive order', () => {
    render(<Footer />)

    expect(footerGroups.map((group) => group.id)).toEqual([
      'keystone',
      'legal',
      'partnership',
    ])
    expect(screen.getByText('Legal')).toBeTruthy()
    expect(
      screen.getByRole('link', { name: 'About Us' }).getAttribute('href')
    ).toBe('https://keyst.one/about-us')
    expect(
      screen.getByRole('link', { name: 'Nexus App' }).getAttribute('href')
    ).toBe('https://keyst.one/nexus')
    expect(
      screen.getByRole('link', { name: 'Supported Coins' }).getAttribute('href')
    ).toBe('https://keyst.one/supported-crypto-assets/')
    expect(
      screen.getByRole('link', { name: 'Zcash Ecosystem' }).getAttribute('href')
    ).toBe('https://keyst.one/zcash')
    expect(
      screen.getByRole('link', { name: 'Privacy Policy' }).getAttribute('href')
    ).toBe('https://keyst.one/privacy-policy')

    const groups = screen.getAllByTestId('footer-group')
    expect(
      groups.map((group) => group.getAttribute('data-mobile-order'))
    ).toEqual(['1', '3', '2'])
  })

  it('renders the current social links and the current year', () => {
    render(<Footer />)

    expect(socialLinks.map((item) => item.id)).toEqual([
      'discord',
      'x',
      'youtube',
      'telegram',
      'reddit',
      'warpcast',
      'primal',
      'facebook',
    ])
    expect(
      screen.getByRole('link', { name: 'Discord' }).getAttribute('href')
    ).toBe('https://keyst.one/discord')
    expect(screen.queryByRole('link', { name: 'Jike' })).toBeNull()
    expect(
      screen.getByText(
        `Keystone © All rights reserved 2018 - ${new Date().getFullYear()}`
      )
    ).toBeTruthy()
  })

  it('scrolls to the top without rendering the discount modal', () => {
    const scrollTo = jest.spyOn(window, 'scrollTo').mockImplementation()
    render(<Footer />)

    fireEvent.click(screen.getByRole('button', { name: 'Back to top' }))

    expect(scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
    expect(screen.queryByText(/discount/i)).toBeNull()
    scrollTo.mockRestore()
  })
})
