import type { NavigationGroup, NavigationItem } from '../shared/types'

const MAIN_SITE = 'https://keyst.one'
const EXTERNAL_STORE_URL = 'https://shop.keyst.one'

export const headerLinks = {
  home: MAIN_SITE,
  app: `${MAIN_SITE}/nexus`,
  shop: `${EXTERNAL_STORE_URL}/shop`,
} as const

export const productGroups: NavigationGroup[] = [
  {
    id: 'hardware',
    label: 'Hardware Wallets',
    items: [
      {
        id: 'keystone-3-pro',
        label: 'Keystone 3 Pro',
        href: `${EXTERNAL_STORE_URL}/products/keystone-3-pro`,
        image: '/layout/header/products/keystone-3-pro.jpg',
        badges: [{ label: 'Hot', tone: 'pink' }],
      },
      {
        id: 'bundle-pack',
        label: 'Keystone 3 Pro Bundle Pack',
        href: `${EXTERNAL_STORE_URL}/products/keystone-bundle-pack`,
        image: '/layout/header/products/keystone-bundle.jpg',
        badges: [
          { label: 'Saved $23', tone: 'orange' },
          { label: 'Hot', tone: 'pink' },
        ],
      },
      {
        id: 'limited-edition',
        label: 'Keystone 3 Pro Co-Branded Version',
        href: `${EXTERNAL_STORE_URL}/products/keystone-3-pro-co-branded-version`,
        image: '/layout/header/products/keystone-3-pro-limited-edition.jpg',
      },
      {
        id: 'nft-customization',
        label: 'Keystone 3 Pro Customization',
        href: `${EXTERNAL_STORE_URL}/products/keystone-3-pro-customization`,
        image: '/layout/header/products/keystone-3-pro-nft-customization.jpg',
      },
    ],
  },
  {
    id: 'developer',
    label: 'Developer Hardware',
    items: [
      {
        id: 'k3ProForgeBox',
        label: 'ForgeBox',
        href: `${EXTERNAL_STORE_URL}/products/forgebox`,
        image: '/layout/header/products/keystone-3-forge-box.webp',
        badges: [{ label: 'New', tone: 'purple' }],
      },
    ],
  },
  {
    id: 'seedPhraseStorage',
    label: 'Seed Phrase Storage',
    items: [
      {
        id: 'tablet',
        label: 'Keystone Tablet',
        href: `${EXTERNAL_STORE_URL}/products/keystone-tablet`,
        image: '/layout/header/products/kt002.jpg',
      },
      {
        id: 'tablet-plus',
        label: 'Keystone Tablet Plus',
        href: `${EXTERNAL_STORE_URL}/products/keystone-tablet-plus`,
        image: '/layout/header/products/kt003.jpg',
        badges: [{ label: 'Hot', tone: 'pink' }],
      },
      {
        id: 'tablet-punch',
        label: 'Keystone Tablet Punch',
        href: `${EXTERNAL_STORE_URL}/products/keystone-tablet-punch`,
        image: '/layout/header/products/kt004.jpg',
      },
    ],
  },
  {
    id: 'accessories',
    label: 'Accessories',
    items: [
      {
        id: 'wallet-pouch',
        label: 'Keystone Wallet Pouch',
        href: `${EXTERNAL_STORE_URL}/products/keystone-wallet-pouch-2`,
        image: '/layout/header/products/pouch2.jpg',
        badges: [{ label: 'Hot', tone: 'pink' }],
      },
      {
        id: 'tablet-pouch',
        label: 'Keystone Tablet Pouch',
        href: `${EXTERNAL_STORE_URL}/products/keystone-wallet-protective-leather-pouch`,
        image: '/layout/header/products/pouch.jpg',
      },
    ],
  },
]

export const featureItems: NavigationItem[] = [
  {
    id: 'supported-wallets',
    label: 'Supported Wallets & Coins',
    href: `${MAIN_SITE}/supported-wallets-and-assets`,
    image: '/layout/header/features/coins.jpg',
  },
  {
    id: 'firmware',
    label: 'Firmware',
    href: `${MAIN_SITE}/firmware`,
    icon: '/layout/header/features/download.svg',
  },
  {
    id: 'btc-only',
    label: 'BTC-Only',
    href: `${MAIN_SITE}/btc-only`,
    icon: '/layout/header/features/btc-only.svg',
  },
  {
    id: 'open-source',
    label: 'Open Source',
    href: `${MAIN_SITE}/open-source`,
    icon: '/layout/header/features/open-source.svg',
  },
  {
    id: 'roadmap',
    label: 'Roadmap',
    href: `${MAIN_SITE}/roadmap`,
    icon: '/layout/header/features/roadmap.svg',
  },
  {
    id: 'authentication',
    label: 'Device Verification',
    href: `${MAIN_SITE}/authentication`,
    icon: '/layout/header/features/device-verification.svg',
  },
  {
    id: 'suggest-assets',
    label: 'Suggest Assets',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSeaUn_GxkxNzNEeKx5s9CQFtB3YDW_Twmf0rARqeJVsUV2QlQ/viewform?usp=sf_link',
    icon: '/layout/header/features/download.svg',
  },
]

export const learnItems: NavigationItem[] = [
  {
    id: 'get-started',
    label: 'Get started',
    href: `${MAIN_SITE}/get-started`,
    icon: '/layout/header/learn/get-started.svg',
  },
  {
    id: 'tutorials',
    label: 'Tutorials',
    href: 'https://support.keyst.one',
    icon: '/layout/header/learn/tutorials.svg',
    target: '_blank',
  },
  {
    id: 'expert-reviews',
    label: 'Expert reviews',
    href: `${MAIN_SITE}/expert-reviews`,
    icon: '/layout/header/learn/expert-reviews.svg',
  },
]

export const mobileLearnItem: NavigationItem = {
  id: 'blog',
  label: 'Blog',
  href: '/',
  icon: '/layout/header/learn/blog.svg',
}

export const blogItems: NavigationItem[] = [
  {
    id: 'crypto-wallet',
    label: 'What is a Crypto Wallet',
    href: '/understanding-crypto-wallets-a-guide-for-beginners',
  },
  {
    id: 'air-gapped',
    label: 'Why Air-Gapped',
    href: '/what-is-air-gapped-crypto-wallet-why-air-gapped',
  },
  {
    id: 'open-source',
    label: 'Why Open Source',
    href: '/the-role-of-open-source-tech-in-keystones-development-4dd77faea752',
  },
  {
    id: 'journey',
    label: 'Our Journey',
    href: '/keystones-journey-embracing-open-source-and-self-custody-in-the-web3-world-a-letter-from-our-77192ca8e107',
  },
]

export const partnershipGroups: NavigationGroup[] = [
  {
    id: 'strategic',
    label: 'Strategic Partner',
    items: [
      {
        id: 'metamask',
        label: 'MetaMask',
        description: 'EVM-based Web3 Wallet',
        href: `${MAIN_SITE}/metamask`,
        icon: '/layout/header/partnerships/metamask.svg',
      },
      {
        id: 'okx',
        label: 'OKX Web3 Wallet',
        description: 'Leading Multi-Chain Wallet',
        href: `${MAIN_SITE}/okx`,
        icon: '/layout/header/partnerships/okx.svg',
      },
      {
        id: 'zcash',
        label: 'Zcash',
        description: 'Privacy-first Blockchain',
        href: `${MAIN_SITE}/zcash`,
        icon: '/layout/header/partnerships/zcash.svg',
      },
    ],
  },
  {
    id: 'limited-editions',
    label: 'Limited Editions',
    items: [
      {
        id: 'solflare',
        label: 'Keystone 3 Pro <> Solflare',
        href: `${EXTERNAL_STORE_URL}/products/keystone-3-pro-co-branded-version`,
      },
      {
        id: 'okx-edition',
        label: 'Keystone 3 Pro <> OKX',
        href: `${EXTERNAL_STORE_URL}/products/keystone-3-pro-co-branded-version`,
      },
      {
        id: 'safe',
        label: 'Keystone 3 Pro <> Safe',
        href: `${EXTERNAL_STORE_URL}/products/keystone-3-pro-co-branded-version`,
      },
      {
        id: 'more',
        label: 'More',
        href: `${EXTERNAL_STORE_URL}/products/keystone-3-pro-co-branded-version`,
      },
    ],
  },
]

export const affiliateItem: NavigationItem = {
  id: 'affiliates',
  label: 'Affiliate Program',
  description:
    'By joining Keystone affiliate program, you can earn commissions and rewards easily!',
  href: `${MAIN_SITE}/affiliates`,
  image: '/layout/header/partnerships/affiliate.jpg',
}
