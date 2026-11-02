import type { NavigationGroup, SocialLink } from '../shared/types'

const MAIN_SITE = 'https://keyst.one'

export interface FooterNavigationGroup extends NavigationGroup {
  mobileOrder: number
}

export const footerGroups: FooterNavigationGroup[] = [
  {
    id: 'keystone',
    label: 'Keystone',
    mobileOrder: 1,
    items: [
      { id: 'AboutUs', label: 'About Us', href: `${MAIN_SITE}/about-us` },
      { id: 'NexusApp', label: 'Nexus App', href: `${MAIN_SITE}/nexus` },
      { id: 'Blog', label: 'Blog', href: '/' },
      {
        id: 'FirmwareUpdate',
        label: 'Firmware Update',
        href: `${MAIN_SITE}/firmware`,
      },
      {
        id: 'SuggestWalletOrAssets',
        label: 'Suggest Wallet/Assets',
        href: 'https://docs.google.com/forms/d/e/1FAIpQLSeaUn_GxkxNzNEeKx5s9CQFtB3YDW_Twmf0rARqeJVsUV2QlQ/viewform?usp=sf_link',
        target: '_blank',
      },
      {
        id: 'SupportedCoins',
        label: 'Supported Coins',
        href: `${MAIN_SITE}/supported-crypto-assets/`,
        target: '_blank',
      },
      { id: 'BtcOnly', label: 'BTC-Only', href: `${MAIN_SITE}/btc-only` },
      { id: 'Roadmap', label: 'Roadmap', href: `${MAIN_SITE}/roadmap` },
      {
        id: 'PrivacyPromises',
        label: 'Privacy Promises',
        href: `${MAIN_SITE}/privacy-promises`,
      },
      {
        id: 'Support',
        label: 'Support',
        href: 'https://support.keyst.one',
        target: '_blank',
      },
      {
        id: 'GitHubRepo',
        label: 'GitHub Repo',
        href: 'https://github.com/KeystoneHQ',
        target: '_blank',
      },
      {
        id: 'ENSDatabase',
        label: 'ENS Database',
        href: 'https://github.com/KeystoneHQ/ENS-meta-repo/releases',
        target: '_blank',
      },
      {
        id: 'ABIPack',
        label: 'ABI Pack',
        href: 'https://github.com/KeystoneHQ/Smart-Contract-Metadata-Registry/releases',
        target: '_blank',
      },
    ],
  },
  {
    id: 'legal',
    label: 'Legal',
    mobileOrder: 3,
    items: [
      {
        id: 'termsOfConditions',
        label: 'Terms Of Conditions',
        href: `${MAIN_SITE}/terms-of-conditions`,
      },
      {
        id: 'PrivacyPolicy',
        label: 'Privacy Policy',
        href: `${MAIN_SITE}/privacy-policy`,
      },
      {
        id: 'CookiePolicy',
        label: 'Cookie Policy',
        href: `${MAIN_SITE}/cookie-policy`,
      },
      {
        id: 'ShippingPolicy',
        label: 'Shipping Policy',
        href: `${MAIN_SITE}/shipping-policy`,
      },
      {
        id: 'RefundPolicy',
        label: 'Refund Policy',
        href: `${MAIN_SITE}/refund-policy`,
      },
    ],
  },
  {
    id: 'partnership',
    label: 'Partnership',
    mobileOrder: 2,
    items: [
      { id: 'Resellers', label: 'Resellers', href: `${MAIN_SITE}/resellers` },
      {
        id: 'Affiliate',
        label: 'Affiliates',
        href: `${MAIN_SITE}/affiliates`,
      },
      {
        id: 'BountyProgram',
        label: 'Bounty Program',
        href: `${MAIN_SITE}/bug-bounty-program`,
      },
      {
        id: 'MediaKit',
        label: 'Media Kit',
        href: 'https://drive.google.com/drive/folders/1MqffY73AbWE3ItSE6s_YP8SD7k1Gbz8r',
        target: '_blank',
      },
      {
        id: 'MetaMask',
        label: 'MetaMask Compatibility',
        href: `${MAIN_SITE}/metamask`,
      },
      {
        id: 'Zcash',
        label: 'Zcash Ecosystem',
        href: `${MAIN_SITE}/zcash`,
        target: '_blank',
      },
    ],
  },
]

export const paymentMethods = [
  { id: 'paypal', label: 'PayPal', icon: '/layout/footer/payment/paypal.svg' },
  { id: 'visa', label: 'Visa', icon: '/layout/footer/payment/visa.svg' },
  {
    id: 'mastercard',
    label: 'Mastercard',
    icon: '/layout/footer/payment/mastercard.svg',
  },
  {
    id: 'bitcoin',
    label: 'Bitcoin',
    icon: '/layout/footer/payment/bitcoin.svg',
  },
  {
    id: 'solana-pay-mark',
    label: 'Solana Pay',
    icon: '/layout/footer/payment/solana-pay-mark.svg',
  },
  {
    id: 'unionpay',
    label: 'UnionPay',
    icon: '/layout/footer/payment/unionpay.svg',
  },
  { id: 'jcb', label: 'JCB', icon: '/layout/footer/payment/jcb.svg' },
  { id: 'mb', label: 'Multibanco', icon: '/layout/footer/payment/mb.svg' },
  {
    id: 'bancontact',
    label: 'Bancontact',
    icon: '/layout/footer/payment/bancontact.svg',
  },
  { id: 'sepa', label: 'SEPA', icon: '/layout/footer/payment/sepa.svg' },
  {
    id: 'more-payment',
    label: 'More payment methods',
    icon: '/layout/footer/payment/more-payment.svg',
  },
] as const

export const socialLinks: SocialLink[] = [
  {
    id: 'discord',
    label: 'Discord',
    href: `${MAIN_SITE}/discord`,
    icon: '/layout/footer/social/discord.png',
    activeIcon: '/layout/footer/social/discord-active.png',
  },
  {
    id: 'x',
    label: 'X',
    href: 'https://twitter.com/KeystoneWallet',
    icon: '/layout/footer/social/x.png',
    activeIcon: '/layout/footer/social/x-active.png',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCaReIdawwYPPcyWGoNunF7g',
    icon: '/layout/footer/social/youtube.png',
    activeIcon: '/layout/footer/social/youtube-active.png',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    href: 'https://t.me/KeystoneWallet',
    icon: '/layout/footer/social/telegram.png',
    activeIcon: '/layout/footer/social/telegram-active.png',
  },
  {
    id: 'reddit',
    label: 'Reddit',
    href: 'https://www.reddit.com/r/KeystoneWallet/',
    icon: '/layout/footer/social/reddit.png',
    activeIcon: '/layout/footer/social/reddit-active.png',
  },
  {
    id: 'warpcast',
    label: 'Warpcast',
    href: 'https://warpcast.com/keystonewallet',
    icon: '/layout/footer/social/warpcast.png',
    activeIcon: '/layout/footer/social/warpcast-active.png',
  },
  {
    id: 'primal',
    label: 'Primal',
    href: 'https://primal.net/p/npub16s4cnphx2k7ndmlt9qmurkdrrulcammg3jxnz0f9c7dhepqg38zqpp4p24',
    icon: '/layout/footer/social/primal.png',
    activeIcon: '/layout/footer/social/primal-active.png',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/people/Keystone-Wallet/61558817937104/',
    icon: '/layout/footer/social/facebook.png',
    activeIcon: '/layout/footer/social/facebook-active.png',
  },
]

export const footerUtilityLinks = {
  shipping: `${MAIN_SITE}/shipping-regions`,
  tracking: 'https://shop.keyst.one/apps/17TRACK',
} as const

export const contactTicketLink =
  'https://keystonewallet.atlassian.net/servicedesk/customer/portal/1'
