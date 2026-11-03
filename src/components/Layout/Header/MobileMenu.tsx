import React from 'react'
import { ChevronIcon } from '../shared/icons'
import FeatureMenu from './FeatureMenu'
import LearnMenu from './LearnMenu'
import PartnershipMenu from './PartnershipMenu'
import ProductMenu from './ProductMenu'
import messages from './messages/en'
import { headerLinks } from './navigation'
import {
  MobilePanel,
  MobilePrimaryButton,
  MobilePrimaryLink,
  MobilePrimaryList,
  MobileSubmenu,
} from './index.style'

export type MobileSection = 'products' | 'features' | 'learn' | 'partnerships'

const sections: Array<{ id: MobileSection; label: string }> = [
  { id: 'products', label: messages.products },
  { id: 'features', label: messages.features },
  { id: 'learn', label: messages.learn },
  { id: 'partnerships', label: messages.partnerships },
]

const content: Record<MobileSection, React.ReactNode> = {
  products: <ProductMenu />,
  features: <FeatureMenu />,
  learn: <LearnMenu />,
  partnerships: <PartnershipMenu />,
}

interface MobileMenuProps {
  active: MobileSection | null
  onActiveChange: (_section: MobileSection | null) => void
  onNavigate: () => void
}

export default function MobileMenu({
  active,
  onActiveChange,
  onNavigate,
}: MobileMenuProps) {
  if (active) {
    return (
      <MobilePanel id="mobile-navigation" $submenuOpen>
        <MobileSubmenu id={`mobile-section-${active}`}>
          {content[active]}
        </MobileSubmenu>
      </MobilePanel>
    )
  }

  return (
    <MobilePanel id="mobile-navigation" $submenuOpen={false}>
      <MobilePrimaryList>
        <li>
          <MobilePrimaryButton
            type="button"
            aria-controls="mobile-section-products"
            onClick={() => onActiveChange('products')}
          >
            {messages.products}
            <ChevronIcon />
          </MobilePrimaryButton>
        </li>
        <li>
          <MobilePrimaryLink href={headerLinks.app} onClick={onNavigate}>
            {messages.app}
          </MobilePrimaryLink>
        </li>
        {sections.slice(1).map((section) => (
          <li key={section.id}>
            <MobilePrimaryButton
              type="button"
              aria-controls={`mobile-section-${section.id}`}
              onClick={() => onActiveChange(section.id)}
            >
              {section.label}
              <ChevronIcon />
            </MobilePrimaryButton>
          </li>
        ))}
      </MobilePrimaryList>
    </MobilePanel>
  )
}
