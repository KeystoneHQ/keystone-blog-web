'use client'

import React from 'react'
import Image from 'next/image'
import { GithubIcon } from '../shared/icons'
import BackToTop from './BackToTop'
import ContactButton from './ContactButton'
import messages from './messages/en'
import {
  footerGroups,
  footerUtilityLinks,
  paymentMethods,
  socialLinks,
} from './navigation'
import {
  Brand,
  BrandDetails,
  ContactAddress,
  Copyright,
  FooterContainer,
  FooterGroup,
  FooterLink,
  FooterMain,
  FooterNavigation,
  FooterRoot,
  PaymentDetails,
  PaymentList,
  Slogan,
  SocialLink,
  SocialList,
  SupportEmail,
  UtilityLinks,
  UtilityRow,
} from './index.style'

export default function Footer() {
  return (
    <FooterRoot>
      <FooterContainer>
        <FooterMain>
          <Brand>
            <Image
              src="/layout/footer/logo.png"
              alt="Keystone"
              width={48}
              height={48}
            />
            <Slogan>{messages.slogan}</Slogan>
            <BrandDetails>
              <SupportEmail>
                <span>{messages.supportEmail}</span>
                <a href={`mailto:${messages.supportEmailAddress}`}>
                  {messages.supportEmailAddress}
                </a>
              </SupportEmail>
              <ContactAddress>{messages.address}</ContactAddress>
              <PaymentDetails>
                <span>{messages.paymentMethods}</span>
                <PaymentList aria-label={messages.paymentMethods}>
                  {paymentMethods.map((method) => (
                    <Image
                      key={method.id}
                      src={method.icon}
                      alt={method.label}
                      title={method.label}
                      width={40}
                      height={16}
                      data-testid="payment-method"
                    />
                  ))}
                </PaymentList>
              </PaymentDetails>
            </BrandDetails>
            <ContactButton />
          </Brand>
          <FooterNavigation aria-label="Footer navigation">
            {footerGroups.map((group) => (
              <FooterGroup
                key={group.id}
                $mobileOrder={group.mobileOrder}
                data-testid="footer-group"
                data-mobile-order={group.mobileOrder}
              >
                <h2>{group.label}</h2>
                <ul>
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <FooterLink href={item.href} target={item.target}>
                        {item.label}
                        {item.id === 'GitHubRepo' && <GithubIcon />}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </FooterGroup>
            ))}
          </FooterNavigation>
        </FooterMain>
        <UtilityRow>
          <UtilityLinks>
            <FooterLink href={footerUtilityLinks.shipping}>
              <Image
                src="/layout/footer/ship.svg"
                alt=""
                width={18}
                height={18}
              />
              {messages.shippingRegions}
            </FooterLink>
            <FooterLink href={footerUtilityLinks.tracking} target="_blank">
              <Image
                src="/layout/footer/order-track.svg"
                alt=""
                width={18}
                height={18}
              />
              {messages.trackOrder}
            </FooterLink>
          </UtilityLinks>
          <SocialList>
            {socialLinks.map((item) => (
              <SocialLink
                key={item.id}
                href={item.href}
                target="_blank"
                aria-label={item.label}
                title={item.label}
              >
                <Image src={item.icon} alt="" width={24} height={24} />
                <Image src={item.activeIcon} alt="" width={24} height={24} />
              </SocialLink>
            ))}
          </SocialList>
        </UtilityRow>
        <Copyright>
          Keystone © All rights reserved 2018 - {new Date().getFullYear()}
        </Copyright>
      </FooterContainer>
      <BackToTop />
    </FooterRoot>
  )
}
