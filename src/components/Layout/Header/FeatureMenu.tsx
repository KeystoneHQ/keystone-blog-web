import React from 'react'
import Image from 'next/image'
import { ArrowRightIcon } from '../shared/icons'
import {
  CardCopy,
  FeatureArrow,
  FeatureCard,
  FeatureCardTitle,
  FeatureGrid,
  FeatureLabel,
  FeatureLayout,
  FeatureMenuLink,
} from './index.style'
import { featureItems } from './navigation'

export default function FeatureMenu() {
  const [featured, ...items] = featureItems

  return (
    <FeatureLayout>
      <FeatureCard href={featured.href}>
        {featured.image && (
          <Image
            src={featured.image}
            alt=""
            width={760}
            height={416}
            sizes="380px"
            unoptimized
          />
        )}
        <CardCopy>
          <FeatureCardTitle>
            <span>{featured.label}</span>
            <FeatureArrow $alwaysVisible aria-hidden="true">
              <ArrowRightIcon />
            </FeatureArrow>
          </FeatureCardTitle>
          <small>{featured.description}</small>
        </CardCopy>
      </FeatureCard>
      <FeatureGrid>
        {items.map((item) => (
          <FeatureMenuLink key={item.id} href={item.href}>
            {item.icon && <Image src={item.icon} alt="" width={48} height={48} />}
            <FeatureLabel>{item.label}</FeatureLabel>
            <FeatureArrow aria-hidden="true">
              <ArrowRightIcon />
            </FeatureArrow>
          </FeatureMenuLink>
        ))}
      </FeatureGrid>
    </FeatureLayout>
  )
}
