import { getHeadings, getMarkDownParser } from './markdown'

describe('Markdown parser compatibility', () => {
  it('preserves heading ids and raises heading depth when the article has an h1', () => {
    const source = '# Article\n\n## **Security** guide'

    expect(getHeadings(source)).toEqual([
      { text: 'Article', depth: 2, slug: 'article' },
      { text: 'Security guide', depth: 3, slug: 'security-guide' },
    ])
    expect(getMarkDownParser(source).parse(source)).toContain(
      '<h2 id="article">Article</h2>'
    )
  })

  it('does not raise heading depth when no h1 exists', () => {
    const source = '## Setup'

    expect(getHeadings(source)).toEqual([
      { text: 'Setup', depth: 2, slug: 'setup' },
    ])
    expect(getMarkDownParser(source).parse(source)).toContain(
      '<h2 id="setup">Setup</h2>'
    )
  })
})
