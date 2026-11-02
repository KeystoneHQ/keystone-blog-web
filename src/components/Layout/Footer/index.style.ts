import styled from 'styled-components'
import LayoutLink from '../shared/LayoutLink'
import { layoutTokens } from '../styles/tokens'

const mobile = '@media (max-width: 1000px)'

export const FooterRoot = styled.footer`
  ${layoutTokens}
  padding: 96px 0 24px;
  color: var(--layout-fg);
  background: var(--layout-bg);
  border-top: 1px solid var(--layout-bg-slight);
  font-family: var(--font-open-sans), 'Open Sans', sans-serif;

  &,
  & * {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li,
  p,
  h2 {
    margin: 0;
    padding: 0;
  }

  ${mobile} {
    padding: 96px 24px 24px;
  }
`

export const FooterContainer = styled.div`
  width: min(calc(100% - 48px), var(--layout-content-width));
  margin: 0 auto;

  ${mobile} {
    width: 100%;
  }
`

export const FooterMain = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  ${mobile} {
    flex-direction: column;
    align-items: stretch;
  }
`

export const Brand = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > img {
    width: 48px;
    height: 48px;
  }
`

export const Slogan = styled.p`
  margin-top: 24px !important;
  color: var(--layout-fg);
  font-family: var(--font-montserrat), Montserrat, sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  white-space: pre-line;

  ${mobile} {
    font-size: 14px;
    line-height: 22px;
  }
`

export const BrandDetails = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #969aa3;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0.04em;

  ${mobile} {
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0.02em;
  }
`

export const SupportEmail = styled.div`
  display: flex;
  flex-direction: column;

  a {
    margin-top: 8px;
    color: var(--layout-fg);
    text-decoration: underline;
    text-underline-offset: 0;
    transition: var(--layout-transition);
  }

  a:hover,
  a:focus-visible {
    color: var(--layout-fg-muted);
  }
`

export const ContactAddress = styled.p`
  white-space: pre-line;
`

export const PaymentDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const PaymentList = styled.div`
  width: 280px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;

  img {
    width: auto;
    height: 16px;
    object-fit: contain;
  }

  ${mobile} {
    width: 100%;
  }
`

export const ContactTicketButton = styled(LayoutLink)`
  min-height: 40px;
  margin-top: 85px;
  padding: 0 16px;
  border: 2px solid #757985;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  overflow: hidden;
  color: var(--layout-fg);
  background: transparent;
  font-family: var(--font-montserrat), Montserrat, sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  white-space: nowrap;
  transition: var(--layout-transition);

  svg {
    width: 18px;
    height: 18px;
    color: var(--layout-accent-hover);
  }

  &:hover,
  &:focus-visible {
    border-color: #969aa3;
    background: rgba(255, 255, 255, 0.04);
  }

  ${mobile} {
    min-height: 32px;
    margin-top: 40px;
  }
`

export const FooterNavigation = styled.nav`
  margin-left: 80px;
  display: flex;
  justify-content: flex-start;

  ${mobile} {
    width: 100%;
    margin-top: 16px;
    margin-left: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 34px;
  }
`

export const FooterGroup = styled.section<{ $mobileOrder: number }>`
  min-width: 0;
  margin-right: 80px;

  &:last-child {
    margin-right: 0;
  }

  h2 {
    margin-bottom: 24px;
    color: var(--layout-fg-muted);
    font-size: 18px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: 0.04em;
  }

  li {
    margin-bottom: 8px;
  }

  a {
    color: #83868f;
  }

  ${mobile} {
    margin-top: 48px;
    margin-right: 0;
    order: ${({ $mobileOrder }) => $mobileOrder};

    h2 {
      font-size: 14px;
      line-height: 22px;
    }
  }
`

export const FooterLink = styled(LayoutLink)`
  display: inline-flex;
  align-items: center;
  color: var(--layout-fg-subtle);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.04em;
  white-space: nowrap;
  transition: var(--layout-transition);

  svg {
    width: 18px;
    height: 18px;
    margin-left: 4px;
    color: var(--layout-fg-muted);
    transition: var(--layout-transition);
  }

  &:hover,
  &:focus-visible,
  &:hover svg,
  &:focus-visible svg {
    color: var(--layout-fg);
  }

  ${mobile} {
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0.02em;
  }
`

export const UtilityRow = styled.div`
  height: 48px;
  margin-top: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${mobile} {
    height: auto;
    flex-direction: column;
  }
`

export const UtilityLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 24px;

  a {
    display: inline-flex;
    align-items: center;
    color: var(--layout-fg-muted);
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0.04em;
  }

  img {
    width: 18px;
    height: 18px;
    margin-right: 8px;
  }

  ${mobile} {
    font-size: 12px;
    line-height: 18px;
    flex-wrap: nowrap;
  }
`

export const SocialList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  ${mobile} {
    margin-top: 48px;
    gap: 16px;
  }
`

export const SocialLink = styled(LayoutLink)`
  width: 24px;
  height: 24px;
  position: relative;
  display: inline-flex;

  img {
    width: 24px;
    height: 24px;
    position: absolute;
    inset: 0;
    transition: var(--layout-transition);
  }

  img:last-child {
    opacity: 0;
  }

  &:hover img:first-child,
  &:focus-visible img:first-child {
    opacity: 0;
  }

  &:hover img:last-child,
  &:focus-visible img:last-child {
    opacity: 1;
  }
`

export const Copyright = styled.p`
  margin-top: 16px !important;
  color: var(--layout-fg-subtle);
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.04em;
  text-align: center;

  ${mobile} {
    margin-top: 24px !important;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0.02em;
  }
`

export const BackToTopButton = styled.button`
  width: 48px;
  height: 48px;
  padding: 0;
  border: 1px solid #757985;
  border-radius: 50%;
  position: fixed;
  right: 24px;
  bottom: 90px;
  z-index: 100;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--layout-fg-muted);
  background: rgba(255, 255, 255, 0.01);
  cursor: pointer;
  transition: var(--layout-transition);

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover,
  &:focus-visible {
    color: var(--layout-accent-hover);
    border-color: #969aa3;
  }

  ${mobile} {
    display: none;
  }
`
