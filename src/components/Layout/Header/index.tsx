'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  ArrowLeftIcon,
  ChevronIcon,
  CloseIcon,
  MenuIcon,
} from '../shared/icons'
import BuyButtonLink from './BuyButtonLink'
import FeatureMenu from './FeatureMenu'
import LearnMenu from './LearnMenu'
import MobileMenu, { type MobileSection } from './MobileMenu'
import PartnershipMenu from './PartnershipMenu'
import ProductMenu from './ProductMenu'
import messages from './messages/en'
import { headerLinks } from './navigation'
import {
  AppLink,
  DesktopNavigation,
  Dropdown,
  HeaderActions,
  HeaderContainer,
  HeaderRoot,
  LogoLink,
  MenuButton,
  MenuItem,
  MenuList,
  MobileBackButton,
  MobileSectionTitle,
  MobileToggle,
} from './index.style'

type MenuName = 'products' | 'features' | 'learn' | 'partnerships'

const menus: Array<{ id: MenuName; label: string }> = [
  { id: 'products', label: messages.products },
  { id: 'features', label: messages.features },
  { id: 'learn', label: messages.learn },
  { id: 'partnerships', label: messages.partnerships },
]

const menuContent: Record<MenuName, React.ReactNode> = {
  products: <ProductMenu />,
  features: <FeatureMenu />,
  learn: <LearnMenu />,
  partnerships: <PartnershipMenu />,
}

export default function Header() {
  const pathname = usePathname()
  const [activeMenu, setActiveMenu] = useState<MenuName | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<MobileSection | null>(null)

  const closeMenus = () => {
    setActiveMenu(null)
    setMobileOpen(false)
    setMobileSection(null)
  }

  useEffect(() => {
    closeMenus()
  }, [pathname])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenus()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileOpen])

  const mobileSectionTitle = mobileSection
    ? menus.find((menu) => menu.id === mobileSection)?.label
    : null

  const toggleMobileMenu = () => {
    if (mobileOpen) {
      closeMenus()
      return
    }

    setMobileOpen(true)
  }

  return (
    <HeaderRoot onMouseLeave={() => setActiveMenu(null)}>
      <HeaderContainer>
        {mobileSection && (
          <MobileBackButton
            type="button"
            aria-label={messages.backMenu}
            onClick={() => setMobileSection(null)}
          >
            <ArrowLeftIcon />
          </MobileBackButton>
        )}
        <LogoLink
          href={headerLinks.home}
          aria-label={messages.home}
          $mobileHidden={Boolean(mobileSection)}
        >
          <Image
            src="/layout/header/logo.png"
            alt=""
            width={142}
            height={32}
            priority
            className="header-logo-desktop"
          />
          <Image
            src="/layout/header/logo-mobile.svg"
            alt=""
            width={32}
            height={32}
            priority
            className="header-logo-mobile"
          />
        </LogoLink>
        {mobileSectionTitle && (
          <MobileSectionTitle data-testid="mobile-section-title">
            {mobileSectionTitle}
          </MobileSectionTitle>
        )}
        <DesktopNavigation aria-label="Primary navigation">
          <MenuList>
            {menus.slice(0, 1).map((menu) => (
              <MenuItem
                key={menu.id}
                onMouseEnter={() => setActiveMenu(menu.id)}
              >
                <MenuButton
                  type="button"
                  $active={activeMenu === menu.id}
                  aria-expanded={activeMenu === menu.id}
                  aria-controls={`header-menu-${menu.id}`}
                  onClick={() =>
                    setActiveMenu(activeMenu === menu.id ? null : menu.id)
                  }
                >
                  {menu.label}
                  <ChevronIcon />
                </MenuButton>
              </MenuItem>
            ))}
            <MenuItem>
              <AppLink href={headerLinks.app}>{messages.app}</AppLink>
            </MenuItem>
            {menus.slice(1).map((menu) => (
              <MenuItem
                key={menu.id}
                onMouseEnter={() => setActiveMenu(menu.id)}
              >
                <MenuButton
                  type="button"
                  $active={activeMenu === menu.id}
                  aria-expanded={activeMenu === menu.id}
                  aria-controls={`header-menu-${menu.id}`}
                  onClick={() =>
                    setActiveMenu(activeMenu === menu.id ? null : menu.id)
                  }
                >
                  {menu.label}
                  <ChevronIcon />
                </MenuButton>
              </MenuItem>
            ))}
          </MenuList>
        </DesktopNavigation>
        <HeaderActions>
          <BuyButtonLink href={headerLinks.shop}>{messages.buy}</BuyButtonLink>
          <MobileToggle
            type="button"
            aria-label={mobileOpen ? messages.closeMenu : messages.openMenu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={toggleMobileMenu}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </MobileToggle>
        </HeaderActions>
      </HeaderContainer>
      {activeMenu && (
        <Dropdown id={`header-menu-${activeMenu}`}>
          {menuContent[activeMenu]}
        </Dropdown>
      )}
      {mobileOpen && (
        <MobileMenu
          active={mobileSection}
          onActiveChange={setMobileSection}
          onNavigate={closeMenus}
        />
      )}
    </HeaderRoot>
  )
}
