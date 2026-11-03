'use client'

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import {
  ProductPreviewLayer,
  ProductPreviewStage,
} from './index.style'

const TRANSITION_DURATION = 400

export interface PreviewProduct {
  id: string
  label: string
  image: string
}

function PreviewLayer({
  phase,
  product,
}: {
  phase: 'enter' | 'exit'
  product: PreviewProduct
}) {
  const [visible, setVisible] = useState(phase === 'exit')

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setVisible(phase === 'enter')
    })

    return () => window.cancelAnimationFrame(frame)
  }, [phase])

  return (
    <ProductPreviewLayer $visible={visible} aria-hidden="true">
      <Image src={product.image} alt="" fill/>
    </ProductPreviewLayer>
  )
}

export default function ProductPreview({ product }: { product: PreviewProduct }) {
  const currentRef = useRef(product)
  const [current, setCurrent] = useState(product)
  const [previous, setPrevious] = useState<PreviewProduct>()

  useEffect(() => {
    if (currentRef.current.id === product.id) {
      currentRef.current = product
      setCurrent(product)
      return
    }

    setPrevious(currentRef.current)
    currentRef.current = product
    setCurrent(product)

    const timer = window.setTimeout(() => {
      setPrevious(undefined)
    }, TRANSITION_DURATION)

    return () => window.clearTimeout(timer)
  }, [product])

  return (
    <ProductPreviewStage
      data-testid="product-preview"
      data-product-id={current.id}
      role="img"
      aria-label={current.label}
    >
      {previous && <PreviewLayer key={previous.id} phase="exit" product={previous} />}
      <PreviewLayer key={current.id} phase="enter" product={current} />
    </ProductPreviewStage>
  )
}
