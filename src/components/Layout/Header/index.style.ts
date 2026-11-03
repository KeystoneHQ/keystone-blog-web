import styled, { css } from 'styled-components'
import LayoutLink from '../shared/LayoutLink'
import { layoutTokens } from '../styles/tokens'

const mobile = '@media (max-width: 1000px)'

export const HeaderRoot = styled.header`
  ${layoutTokens}
  position: sticky;
  top: 0;
  z-index: 1100;
  height: var(--layout-header-height);
  color: var(--layout-fg);
  font-family: var(--font-open-sans), 'Open Sans', sans-serif;
  background: rgba(17, 18, 20, 0.88);
  border-bottom: 1px solid var(--layout-border);
  backdrop-filter: blur(8px);

  &,
  & * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }
`

export const HeaderContainer = styled.div`
  width: min(calc(100% - 48px), var(--layout-content-width));
  height: var(--layout-header-height);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;

  ${mobile} {
    position: relative;
    width: 100%;
    padding: 0 16px;
  }
`

export const LogoLink = styled(LayoutLink)<{ $mobileHidden?: boolean }>`
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;

  .header-logo-desktop {
    display: block;
    width: 123px;
    height: 32px;
    object-fit: contain;
  }

  .header-logo-mobile {
    display: none;
  }

  ${mobile} {
    display: ${({ $mobileHidden }) => ($mobileHidden ? 'none' : 'inline-flex')};

    .header-logo-desktop {
      display: none;
    }

    .header-logo-mobile {
      display: block;
      width: 32px;
      height: 32px;
    }
  }
`

export const DesktopNavigation = styled.nav`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex: 1;

  ${mobile} {
    display: none;
  }
`

export const MenuList = styled.ul`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 26px;
  margin: 0;
  padding: 0;
  list-style: none;
`

export const MenuItem = styled.li`
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0;
`

export const MenuButton = styled.button<{ $active?: boolean }>`
  border: 0;
  padding: 4px 12px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${({ $active }) =>
    $active ? 'var(--layout-fg)' : 'var(--layout-fg-muted)'};
  background: transparent;
  cursor: pointer;
  font-family: var(--font-montserrat), Montserrat, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.04em;
  transition: var(--layout-transition);

  svg {
    width: 24px;
    height: 24px;
    color: ${({ $active }) =>
    $active ? 'var(--layout-accent-hover)' : 'var(--layout-fg-muted)'};
    transition: var(--layout-transition);
    transform: ${({ $active }) => ($active ? 'rotate(180deg)' : 'none')};
  }

  &:hover,
  &:focus-visible {
    color: var(--layout-fg);
  }
`

export const AppLink = styled(LayoutLink)`
  padding: 4px 12px;
  color: var(--layout-fg-muted);
  font-family: var(--font-montserrat), Montserrat, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.04em;
  transition: var(--layout-transition);

  &:hover,
  &:focus-visible {
    color: var(--layout-fg);
  }
`

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const BuyLink = styled(LayoutLink)`
  --buy-glow-x: 50%;
  --buy-glow-y: 50%;
  height: 32px;
  padding: 0 16px;
  border: 2px solid transparent;
  border-image: linear-gradient(90deg, #3d71ff 0%, #93cef5 100%) 1;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--layout-fg);
  background: transparent;
  font-family: var(--font-open-sans), 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  white-space: nowrap;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background: radial-gradient(
      34.46% 148.73% at var(--buy-glow-x) var(--buy-glow-y),
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    opacity: 0;
    transition: opacity 160ms ease;
  }

  > span {
    position: relative;
    z-index: 1;
  }

  &:hover::before,
  &:focus-visible::before {
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid #93cef5;
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      transition: none;
    }
  }

  ${mobile} {
    display: none;
  }
`

export const MobileToggle = styled.button`
  width: 40px;
  height: 40px;
  padding: 8px;
  border: 0;
  display: none;
  align-items: center;
  justify-content: center;
  color: var(--layout-fg);
  background: transparent;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }

  ${mobile} {
    display: inline-flex;
  }
`

export const MobileBackButton = styled.button`
  display: none;

  ${mobile} {
    width: 40px;
    height: 40px;
    padding: 8px;
    border: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--layout-fg-muted);
    background: transparent;
    cursor: pointer;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`

export const MobileSectionTitle = styled.h2`
  display: none;

  ${mobile} {
    max-width: calc(100% - 144px);
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    overflow: hidden;
    color: var(--layout-fg-muted);
    font-family: var(--font-montserrat), Montserrat, sans-serif;
    font-size: 14px;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: 0.02em;
    text-overflow: ellipsis;
    white-space: nowrap;
    transform: translate(-50%, -50%);
  }
`

export const Dropdown = styled.div`
  position: absolute;
  top: var(--layout-header-height);
  left: 0;
  width: 100%;
  min-height: 0;
  color: var(--layout-fg);
  background: rgba(17, 18, 20, 0.88);
  border-top: 1px solid var(--layout-border);
  border-bottom: 1px solid var(--layout-border);
  backdrop-filter: blur(6px);
  animation: layout-menu-in 180ms ease both;

  @keyframes layout-menu-in {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  ${mobile} {
    position: static;
    min-height: 0;
    border: 0;
    box-shadow: none;
    background: transparent;
  }
`

export const DropdownContainer = styled.div`
  width: min(calc(100% - 48px), var(--layout-content-width));
  margin: 0 auto;
  padding: 40px 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 48px;

  ${mobile} {
    width: 100%;
    padding: 8px 0 20px;
    grid-template-columns: 1fr;
    gap: 24px;
  }
`

export const MenuGroup = styled.section`
  min-width: 0;

  h2 {
    margin: 0 0 24px;
    padding: 0;
    color: var(--layout-fg-muted);
    font-family: var(--font-montserrat), Montserrat, sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
    letter-spacing: 0.04em;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    margin: 0 0 12px;
  }
`

export const MenuLink = styled(LayoutLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--layout-fg-subtle);
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.04em;
  transition: var(--layout-transition);

  &:hover,
  &:focus-visible {
    color: var(--layout-fg);
  }

  img {
    width: 28px;
    height: 28px;
    object-fit: contain;
  }
`

export const CardLink = styled(MenuLink)`
  padding: 0;
  flex-direction: column;
  align-items: flex-start;
  background: transparent;
  border: 0;

  img {
    width: 100%;
    height: auto;
    border-radius: 16px;
    object-fit: cover;
  }
`

export const CardCopy = styled.span`
  display: flex;
  flex-direction: column;
  gap: 4px;

  strong {
    color: var(--layout-fg);
    font-family: var(--font-montserrat), Montserrat, sans-serif;
    font-weight: 600;
  }

  small {
    color: var(--layout-fg-subtle);
    font-size: 12px;
    line-height: 18px;
  }
`

export const ProductLayout = styled.div`
  width: min(calc(100% - 48px), var(--layout-content-width));
  height: 480px;
  margin: 0 auto;
  position: relative;
  padding: 48px 0 44px;

  ${mobile} {
    width: 100%;
    height: auto;
    padding: 12px 24px 24px;
  }
`

export const ProductGroups = styled.div`
  width: 800px;
  height: 480px;
  display: flex;
  align-items: start;
  justify-content: start;
  flex-wrap: wrap;
  flex-direction: column;

  ${mobile} {
    width: 100%;
    height: auto;
  }
`

export const ProductGroup = styled.section`
  min-width: 0;
  margin-bottom: 12px;

  h2 {
    margin: 0 0 24px;
    color: var(--layout-fg-subtle);
    font-family: var(--font-montserrat), Montserrat, sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
    letter-spacing: 0.04em;
  }
`

export const ProductList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

export const ProductMenuItem = styled.li`
  margin: 0 0 12px;
`

export const ProductMenuLink = styled(LayoutLink)`
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  padding: 4px 0;
  color: var(--layout-fg-muted);
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 0.04em;
  white-space: nowrap;
  transition: var(--layout-transition);

  &:hover,
  &:focus-visible {
    color: var(--layout-fg);
  }

  ${mobile} {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.02em;
  }
`

export const ProductMenuCopy = styled.span`
  display: inline-flex;
  align-items: center;
  min-width: 0;
  white-space: nowrap;
`

export const ProductBadge = styled.span<{
  $tone: 'pink' | 'orange' | 'purple'
}>`
  margin-left: 6px;
  padding: 2px 6px;
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  color: ${({ $tone }) => {
    if ($tone === 'orange') return '#e07f3f'
    if ($tone === 'purple') return '#ad93f5'
    return '#e0516e'
  }};
  background: ${({ $tone }) => {
    if ($tone === 'orange') return 'rgba(224, 127, 63, 0.12)'
    if ($tone === 'purple') return 'rgba(173, 147, 245, 0.12)'
    return 'rgba(224, 81, 110, 0.24)'
  }};
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  text-transform: uppercase;
`

export const ProductArrow = styled.span`
  width: 18px;
  height: 18px;
  margin-left: 2px;
  display: inline-flex;
  flex: 0 0 auto;
  color: #e0516e;
  opacity: 0;
  transform: translateX(0);
  transition: var(--layout-transition);

  svg {
    width: 18px;
    height: 18px;
  }

  ${ProductMenuLink}:hover &,
  ${ProductMenuLink}:focus-visible & {
    opacity: 1;
    transform: translateX(6px);
    color: #e0516e;
  }
`

export const AllProductsLink = styled(ProductMenuLink)`
  position: absolute;
  left: 0;
  bottom: 24px;
  color: var(--layout-fg-subtle);
  font-family: var(--font-montserrat), Montserrat, sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;

  ${ProductArrow} {
    opacity: 1;
    color: var(--layout-fg-subtle);
  }

  ${mobile} {
    position: static;
    margin-top: 32px;
    font-size: 14px;
    line-height: 22px;
  }
`

export const ProductPreviewPane = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 60%;
  height: 480px;
  overflow: hidden;
  background: var(--layout-bg-muted);

  ${mobile} {
    display: none;
  }
`

export const ProductPreviewStage = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`

export const ProductPreviewLayer = styled.div<{ $visible: boolean }>`
  width: 480px;
  height: 100%;
  position: absolute;
  inset: 0;
  overflow: hidden;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? 0 : '20%')});
  transition:
    opacity 400ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;

  @media (prefers-reduced-motion: reduce) {
    transform: none;
    transition: none;
  }

  img {
    object-fit: cover;
  }
`

export const ProductPreviewMask = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  height: 60px;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(26, 27, 31, 0) 0%, #1a1b1f 100%);
`

export const FeatureLayout = styled.div`
  width: min(calc(100% - 48px), var(--layout-content-width));
  min-height: 340px;
  margin: 0 auto;
  padding: 40px 0;
  display: flex;
  justify-content: center;
  gap: 120px;

  ${mobile} {
    width: 100%;
    min-height: 0;
    padding: 12px 24px 24px;
    display: block;
  }
`

export const FeatureCard = styled(CardLink)`
  width: 380px;

  > img {
    width: 380px;
    height: 208px;
  }

  ${CardCopy} {
    margin-top: 24px;
  }

  ${mobile} {
    width: 100%;
    margin-bottom: 24px;

    > img {
      display: none;
    }
  }
`

export const FeatureCardTitle = styled.span`
  display: inline-flex;
  align-items: center;
`

export const FeatureGrid = styled.div`
  width: 620px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 56px;

  ${mobile} {
    width: 100%;
    grid-template-columns: 1fr;
    gap: 0;
  }
`

export const FeatureMenuLink = styled(MenuLink)`
  min-height: 80px;
  padding: 16px 12px;
  font-size: 18px;
  line-height: 28px;

  img {
    width: 48px;
    height: 48px;
    flex: 0 0 auto;
  }

  &:hover,
  &:focus-visible {
    background: var(--layout-bg-subtle);
  }

  ${mobile} {
    min-height: 72px;
    padding: 12px 0;
    font-size: 14px;
    line-height: 22px;
  }
`

export const FeatureLabel = styled.span`
  display: inline-flex;
  align-items: center;
  text-wrap: nowrap;
`

export const FeatureArrow = styled.span<{ $alwaysVisible?: boolean }>`
  width: 18px;
  height: 18px;
  margin-left: 2px;
  display: inline-flex;
  flex: 0 0 auto;
  color: var(--layout-fg-subtle);
  opacity: ${({ $alwaysVisible }) => ($alwaysVisible ? 1 : 0)};
  transform: translateX(0);
  transition: var(--layout-transition);

  svg {
    width: 18px;
    height: 18px;
  }

  ${FeatureCard}:hover &,
  ${FeatureCard}:focus-visible &,
  ${FeatureMenuLink}:hover &,
  ${FeatureMenuLink}:focus-visible & {
    color: var(--quote-border-color);
    opacity: 1;
    transform: translateX(6px);
  }
`

export const LearnLayout = styled.div`
  width: min(calc(100% - 48px), var(--layout-content-width));
  min-height: 437px;
  margin: 0 auto;
  padding: 100px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;

  ${mobile} {
    width: 100%;
    min-height: 0;
    padding: 0;
    display: block;
  }
`

export const LearnLinkArrow = styled.span`
  width: 18px;
  height: 18px;
  margin-left: 2px;
  display: inline-flex;
  flex: 0 0 auto;
  color: currentColor;
  transform: translateX(0);
  transition: var(--layout-transition);

  svg {
    width: 18px;
    height: 18px;
  }
`

export const LearnResourceList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  list-style: none;
`

export const LearnResourceLink = styled(LayoutLink)`
  width: 100%;
  min-height: 80px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--layout-fg-muted);
  font-family: var(--font-open-sans), 'Open Sans', sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0.04em;
  transition: var(--layout-transition);

  ${LearnLinkArrow} {
    color: var(--layout-fg-subtle);
    opacity: 0;
  }

  img {
    width: 48px;
    height: 48px;
    flex: 0 0 auto;
    object-fit: contain;
  }

  &:hover,
  &:focus-visible {
    color: var(--layout-fg);
    background: var(--layout-bg-subtle);
  }

  &:hover ${LearnLinkArrow}, &:focus-visible ${LearnLinkArrow} {
    color: #3d71ff;
    opacity: 1;
    transform: translateX(6px);
  }

  ${mobile} {
    min-height: 72px;
    padding: 12px 24px;
    gap: 16px;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.02em;

    &:hover,
    &:focus-visible {
      background: var(--layout-bg-slight);
    }
  }
`

export const LearnResourceItem = styled.li<{ $mobileOnly?: boolean }>`
  margin: 0;
  display: ${({ $mobileOnly }) => ($mobileOnly ? 'none' : 'block')};

  ${mobile} {
    display: block;
  }
`

export const LearnDivider = styled.div`
  width: 1px;
  height: 240px;
  flex: 0 0 auto;
  background: var(--layout-border);

  ${mobile} {
    display: none;
  }
`

export const LearnBasicInfo = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;

  ${mobile} {
    margin: 24px;
    gap: 16px;
  }
`

export const LearnBasicTitle = styled.h2`
  margin: 0;
  color: var(--layout-fg-subtle);
  font-family: var(--font-montserrat), Montserrat, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;

  ${mobile} {
    font-size: 14px;
    font-weight: 700;
    line-height: 22px;
  }
`

export const LearnBasicList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  list-style: none;

  li {
    margin: 0;
  }
`

export const LearnBasicLink = styled(LayoutLink)`
  display: inline-flex;
  align-items: center;
  color: var(--layout-fg-muted);
  font-family: var(--font-open-sans), 'Open Sans', sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0.04em;
  transition: var(--layout-transition);

  &:hover,
  &:focus-visible {
    color: var(--layout-fg);
  }

  &:hover ${LearnLinkArrow}, &:focus-visible ${LearnLinkArrow} {
    transform: translateX(6px);
  }

  ${mobile} {
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0.02em;
  }
`

export const PartnershipLayout = styled.div`
  width: min(calc(100% - 48px), var(--layout-content-width));
  min-height: 420px;
  margin: 0 auto;
  padding: 40px 0;
  display: flex;
  justify-content: center;
  gap: 120px;

  ${mobile} {
    width: 100%;
    min-height: 0;
    padding: 12px 24px 24px;
    flex-direction: column;
    gap: 30px;
  }
`

export const PartnershipArrow = styled.span`
  width: 18px;
  height: 18px;
  margin-left: 2px;
  display: inline-flex;
  flex: 0 0 auto;
  color: currentColor;
  transform: translateX(0);
  transition: var(--layout-transition);

  svg {
    width: 18px;
    height: 18px;
  }
`

export const PartnershipAffiliateLink = styled(LayoutLink)`
  width: 320px;
  display: flex;
  flex-direction: column;
  color: var(--layout-fg-muted);
  transition: var(--layout-transition);

  > img {
    width: 320px;
    height: 140px;
    border-radius: 16px;
    display: block;
    object-fit: cover;
    background: #000;
  }

  &:hover,
  &:focus-visible {
    color: var(--layout-fg);
  }

  &:hover ${PartnershipArrow}, &:focus-visible ${PartnershipArrow} {
    color: #3d71ff;
    transform: translateX(6px);
  }

  ${mobile} {
    width: 100%;

    > img {
      display: none;
    }
  }
`

export const PartnershipAffiliateCopy = styled.span`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
`

export const PartnershipAffiliateTitle = styled.span`
  display: inline-flex;
  align-items: center;
  font-family: var(--font-montserrat), Montserrat, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;

  ${mobile} {
    font-size: 14px;
    font-weight: 700;
    line-height: 22px;
  }
`

export const PartnershipAffiliateDescription = styled.span`
  margin-top: 12px;
  color: var(--layout-fg-subtle);
  font-family: var(--font-open-sans), 'Open Sans', sans-serif;
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

export const PartnershipGroup = styled.section<{ $named?: boolean }>`
  width: ${({ $named }) => ($named ? '256px' : '320px')};
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  ${mobile} {
    width: 100%;
    padding-top: 0;
    gap: 16px;
  }
`

export const PartnershipGroupTitle = styled.h2`
  margin: 0;
  color: var(--layout-fg-subtle);
  font-family: var(--font-montserrat), Montserrat, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;

  ${mobile} {
    font-size: 14px;
    font-weight: 700;
    line-height: 22px;
  }
`

export const PartnershipList = styled.ul<{ $compact?: boolean }>`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ $compact }) => ($compact ? '8px' : '32px')};
  list-style: none;

  li {
    margin: 0;
  }
`

export const PartnershipPartnerLink = styled(LayoutLink)`
  width: 100%;
  padding: 8px;
  display: flex;
  align-items: center;
  color: var(--layout-fg-muted);
  transition: var(--layout-transition);

  > img {
    width: 64px;
    height: 64px;
    flex: 0 0 auto;
    object-fit: contain;
  }

  ${PartnershipArrow} {
    color: var(--layout-fg-subtle);
    opacity: 0;
  }

  &:hover,
  &:focus-visible {
    color: var(--layout-fg);
    background: var(--layout-bg-subtle);
  }

  &:hover ${PartnershipArrow}, &:focus-visible ${PartnershipArrow} {
    color: #3d71ff;
    opacity: 1;
    transform: translateX(6px);
  }

  ${mobile} {
    > img {
      width: 40px;
      height: 40px;
    }
  }
`

export const PartnershipPartnerInfo = styled.span`
  min-width: 0;
  margin-left: 14px;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
`

export const PartnershipPartnerTitle = styled.span`
  color: var(--layout-fg);
  font-family: var(--font-open-sans), 'Open Sans', sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0.04em;

  ${mobile} {
    font-family: var(--font-montserrat), Montserrat, sans-serif;
    font-weight: 700;
  }
`

export const PartnershipPartnerDescription = styled.span`
  color: var(--layout-fg-subtle);
  font-family: var(--font-open-sans), 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`

export const PartnershipNamedLink = styled(LayoutLink)`
  padding: 4px 0;
  display: inline-flex;
  align-items: center;
  color: var(--layout-fg-muted);
  font-family: var(--font-open-sans), 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.04em;
  transition: var(--layout-transition);

  &:hover,
  &:focus-visible {
    color: var(--layout-fg);
  }

  &:hover ${PartnershipArrow}, &:focus-visible ${PartnershipArrow} {
    transform: translateX(6px);
  }

  ${mobile} {
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0.02em;
  }
`

export const MobilePanel = styled.div<{ $submenuOpen?: boolean }>`
  height: calc(100vh - var(--layout-header-height));
  height: calc(100dvh - var(--layout-header-height));
  position: fixed;
  top: var(--layout-header-height);
  left: 0;
  right: 0;
  padding: ${({ $submenuOpen }) =>
    $submenuOpen
      ? '0 0 calc(48px + env(safe-area-inset-bottom))'
      : '24px 0 calc(48px + env(safe-area-inset-bottom))'};
  overflow-y: auto;
  overscroll-behavior: contain;
  color: var(--layout-fg);
  background: rgba(17, 18, 20, 0.88);
  backdrop-filter: blur(8px);
  -webkit-overflow-scrolling: touch;
`

export const MobilePrimaryList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  list-style: none;

  > li {
    margin: 0;
  }
`

const mobilePrimary = css`
  width: 100%;
  min-height: 46px;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--layout-fg);
  background: transparent;
  border: 0;
  font-family: var(--font-montserrat), Montserrat, sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0.02em;
  text-align: left;
  transition: var(--layout-transition);

  &:hover,
  &:focus-visible {
    color: var(--layout-fg-muted);
    background: rgba(255, 255, 255, 0.04);
  }
`

export const MobilePrimaryButton = styled.button`
  ${mobilePrimary}
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
    color: var(--layout-fg-muted);
    transform: rotate(-90deg);
  }
`

export const MobilePrimaryLink = styled(LayoutLink)`
  ${mobilePrimary}
  justify-content: flex-start;
`

export const MobileSubmenu = styled.div`
  width: 100%;
  min-height: 100%;
  animation: mobile-submenu-enter 160ms ease-out;

  @keyframes mobile-submenu-enter {
    from {
      opacity: 0;
      transform: translateX(12px);
    }

    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`
