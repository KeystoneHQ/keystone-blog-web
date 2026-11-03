import React from 'react'
import Image from 'next/image'
import { ArrowRightIcon } from '../shared/icons'
import { affiliateItem, partnershipGroups } from './navigation'
import {
  PartnershipAffiliateCopy,
  PartnershipAffiliateDescription,
  PartnershipAffiliateLink,
  PartnershipAffiliateTitle,
  PartnershipArrow,
  PartnershipGroup,
  PartnershipGroupTitle,
  PartnershipLayout,
  PartnershipList,
  PartnershipNamedLink,
  PartnershipPartnerDescription,
  PartnershipPartnerInfo,
  PartnershipPartnerLink,
  PartnershipPartnerTitle,
} from './index.style'

export default function PartnershipMenu() {
  return (
    <PartnershipLayout>
      <PartnershipAffiliateLink href={affiliateItem.href}>
        {affiliateItem.image && (
          <Image
            src={affiliateItem.image}
            alt=""
            width={640}
            height={280}
            sizes="320px"
            unoptimized
          />
        )}
        <PartnershipAffiliateCopy>
          <PartnershipAffiliateTitle>
            <span>{affiliateItem.label}</span>
            <PartnershipArrow aria-hidden="true">
              <ArrowRightIcon />
            </PartnershipArrow>
          </PartnershipAffiliateTitle>
          <PartnershipAffiliateDescription>
            {affiliateItem.description}
          </PartnershipAffiliateDescription>
        </PartnershipAffiliateCopy>
      </PartnershipAffiliateLink>

      {partnershipGroups.map((group) => {
        const isNamedGroup = group.id === 'limited-editions'

        return (
          <PartnershipGroup key={group.id} $named={isNamedGroup}>
            <PartnershipGroupTitle>{group.label}</PartnershipGroupTitle>
            <PartnershipList $compact={isNamedGroup}>
              {group.items.map((item) => (
                <li key={item.id}>
                  {isNamedGroup ? (
                    <PartnershipNamedLink href={item.href}>
                      <span>{item.label}</span>
                      <PartnershipArrow aria-hidden="true">
                        <ArrowRightIcon />
                      </PartnershipArrow>
                    </PartnershipNamedLink>
                  ) : (
                    <PartnershipPartnerLink href={item.href}>
                      {item.icon && (
                        <Image src={item.icon} alt="" width={64} height={64} />
                      )}
                      <PartnershipPartnerInfo>
                        <PartnershipPartnerTitle>
                          {item.label}
                        </PartnershipPartnerTitle>
                        {item.description && (
                          <PartnershipPartnerDescription>
                            {item.description}
                          </PartnershipPartnerDescription>
                        )}
                      </PartnershipPartnerInfo>
                      <PartnershipArrow aria-hidden="true">
                        <ArrowRightIcon />
                      </PartnershipArrow>
                    </PartnershipPartnerLink>
                  )}
                </li>
              ))}
            </PartnershipList>
          </PartnershipGroup>
        )
      })}
    </PartnershipLayout>
  )
}
