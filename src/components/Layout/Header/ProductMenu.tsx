import React, { useState } from 'react'
import { ArrowRightIcon } from '../shared/icons'
import messages from './messages/en'
import { headerLinks, productGroups } from './navigation'
import {
  AllProductsLink,
  ProductArrow,
  ProductBadge,
  ProductGroup,
  ProductGroups,
  ProductLayout,
  ProductList,
  ProductMenuCopy,
  ProductMenuItem,
  ProductMenuLink,
  ProductPreviewMask,
  ProductPreviewPane,
} from './index.style'
import ProductPreview from './ProductPreview'

export default function ProductMenu() {
  const firstProduct = productGroups[0].items[0]
  const [preview, setPreview] = useState(firstProduct)

  return (
    <>
      <ProductLayout>
        <ProductGroups>
          {productGroups.map((group) => (
            <ProductGroup key={group.id}>
              <h2>{group.label}</h2>
              <ProductList>
                {group.items.map((item) => (
                  <ProductMenuItem key={item.id}>
                    <ProductMenuLink
                      href={item.href}
                      aria-label={item.label}
                      onMouseEnter={() => setPreview(item)}
                      onFocus={() => setPreview(item)}
                    >
                      <ProductMenuCopy>
                        {item.label}
                        {item.badges?.map((badge) => (
                          <ProductBadge
                            key={`${item.id}-${badge.label}`}
                            $tone={badge.tone}
                            aria-hidden="true"
                          >
                            {badge.label}
                          </ProductBadge>
                        ))}
                      </ProductMenuCopy>
                      <ProductArrow aria-hidden="true">
                        <ArrowRightIcon />
                      </ProductArrow>
                    </ProductMenuLink>
                  </ProductMenuItem>
                ))}
              </ProductList>
            </ProductGroup>
          ))}
        </ProductGroups>
        <AllProductsLink href={headerLinks.shop}>
          <ProductMenuCopy>{messages.allProducts}</ProductMenuCopy>
          <ProductArrow aria-hidden="true">
            <ArrowRightIcon />
          </ProductArrow>
        </AllProductsLink>
      </ProductLayout>
      {preview.image && (
        <ProductPreviewPane>
          <ProductPreview
            product={{ id: preview.id, label: preview.label, image: preview.image }}
          />
          <ProductPreviewMask />
        </ProductPreviewPane>
      )}
    </>
  )
}
