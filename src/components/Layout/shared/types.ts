export interface NavigationItem {
  id: string
  label: string
  href: string
  description?: string
  image?: string
  icon?: string
  target?: '_blank'
  badges?: NavigationBadge[]
}

export interface NavigationBadge {
  label: string
  tone: 'pink' | 'orange' | 'purple'
}

export interface NavigationGroup {
  id: string
  label: string
  items: NavigationItem[]
}

export interface SocialLink {
  id: string
  label: string
  href: string
  icon: string
  activeIcon: string
}
