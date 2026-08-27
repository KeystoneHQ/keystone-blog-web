import { Marked, marked } from 'marked'
import markedAlert from 'marked-alert'
import sanitizeHtml from 'sanitize-html'

const hasHeading1 = (postBody: string): boolean => {
  const tokensList = marked.lexer(postBody)
  return tokensList.some(token => token.type === 'heading' && token.depth === 1)
}

export const getMarkDownParser = (markdownText: string) => {
  const parser = new Marked()
  if (hasHeading1(markdownText)) {
    parser.use({
      walkTokens: (token) => {
        if (token.type === 'heading') token.depth += 1
      },
    })
  }
  return parser
}

const SAFE_TAGS = [
  'p', 'br', 'hr',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'strong', 'em', 'del',
  'ul', 'ol', 'li',
  'blockquote', 'pre', 'code',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'a', 'img', 'div',
]

const isSafeWebUrl = (value: string | undefined, allowMailto = false) => {
  if (!value) return false
  const trimmed = value.trim()
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return true
  if (trimmed.startsWith('#')) return true

  try {
    const parsed = new URL(trimmed)
    if (allowMailto && parsed.protocol === 'mailto:') return true
    if (parsed.protocol !== 'https:') return false

    const hostname = parsed.hostname.toLowerCase().replace(/^\[|\]$/g, '')
    if (hostname === 'localhost' || hostname.endsWith('.localhost')) return false
    if (/^(127\.|10\.|192\.168\.|169\.254\.)/.test(hostname)) return false
    const private172 = hostname.match(/^172\.(\d{1,3})\./)
    if (private172 && Number(private172[1]) >= 16 && Number(private172[1]) <= 31) return false
    if (hostname === '::1' || hostname.startsWith('fc') || hostname.startsWith('fd') || hostname.startsWith('fe80:')) return false
    return true
  } catch {
    return false
  }
}

export const sanitizeRenderedBlogHtml = (renderedHtml: string): string => {
  return sanitizeHtml(renderedHtml, {
    allowedTags: SAFE_TAGS,
    allowedAttributes: {
      a: ['href', 'title', 'rel'],
      img: ['src', 'alt', 'title', 'width', 'height'],
      code: ['class'],
      div: ['class'],
      p: ['class'],
    },
    allowedClasses: {
      div: ['markdown-alert', /^markdown-alert-(note|tip|important|warning|caution)$/],
      p: ['markdown-alert-title'],
      code: [/^language-[a-z0-9_-]+$/i],
    },
    allowedSchemes: ['https', 'mailto'],
    allowProtocolRelative: false,
    transformTags: {
      a: (_tagName, attributes) => {
        if (!isSafeWebUrl(attributes.href, true)) {
          const { href: _href, ...safeAttributes } = attributes
          return { tagName: 'span', attribs: safeAttributes }
        }
        return {
          tagName: 'a',
          attribs: { ...attributes, rel: 'noopener noreferrer' },
        }
      },
      img: (_tagName, attributes) => {
        if (!isSafeWebUrl(attributes.src)) return { tagName: 'span', attribs: {} }
        return { tagName: 'img', attribs: attributes }
      },
    },
  })
}

export const renderSafeBlogMarkdown = (markdownText: string): string => {
  const parser = getMarkDownParser(markdownText)
  parser.use(markedAlert())
  const renderedHtml = parser.parse(markdownText) as string
  return sanitizeRenderedBlogHtml(renderedHtml)
}
