import { renderSafeBlogMarkdown, sanitizeRenderedBlogHtml } from './markdown'

describe('Blog Markdown XSS hardening', () => {
  test('renders normal Markdown and keeps controlled heading ids', () => {
    const html = renderSafeBlogMarkdown('# Hello\n\n[Keystone](https://keyst.one)')

    expect(html).toContain('<h2>Hello</h2>')
    expect(html).toContain('href="https://keyst.one"')
    expect(html).toContain('rel="noopener noreferrer"')
  })

  test('removes scripts, event handlers, forms and unsafe links', () => {
    const html = renderSafeBlogMarkdown(`
<script>alert(1)</script>
<img src="https://keyst.one/image.png" onerror="alert(1)">
[click](javascript:alert(1))
<form action="https://evil.example"><input name="seed"></form>
`)

    expect(html).not.toMatch(/<script|onerror|href=["']javascript:|<form|<input/i)
  })

  test('removes encoded dangerous links after Markdown parsing', () => {
    const html = sanitizeRenderedBlogHtml(
      '<a href="jav&#x61;script:alert(1)">click</a>'
    )

    expect(html).not.toContain('href=')
    expect(html).not.toContain('<a')
    expect(html).toContain('click')
  })

  test('rejects protocol-relative and private-network image URLs', () => {
    const html = sanitizeRenderedBlogHtml(`
      <img src="//evil.example/image.png" alt="one">
      <img src="https://127.0.0.1/image.png" alt="two">
      <img src="https://192.168.1.2/image.png" alt="three">
    `)

    expect(html).not.toContain('<img')
  })

  test('keeps marked-alert structure but removes its inline SVG', () => {
    const html = renderSafeBlogMarkdown('> [!NOTE]\n> Safe content')

    expect(html).toContain('class="markdown-alert markdown-alert-note"')
    expect(html).toContain('class="markdown-alert-title"')
    expect(html).not.toContain('<svg')
    expect(html).toContain('Safe content')
  })
})
