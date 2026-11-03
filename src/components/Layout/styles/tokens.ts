import { css } from 'styled-components'

export const layoutTokens = css`
  --layout-header-height: 64px;
  --layout-content-width: 1280px;
  --layout-bg: var(--banner-bg-color, #111214);
  --layout-bg-muted: #1a1b1f;
  --layout-bg-subtle: #1f2124;
  --layout-bg-slight: #272829;
  --layout-fg: var(--title-color, #f5f8ff);
  --layout-fg-muted: var(--label-color, #bcc0cc);
  --layout-fg-subtle: #83868f;
  --layout-border: #2f3033;
  --layout-accent: var(--link-color, #1f5aff);
  --layout-accent-hover: #e0516e;
  --layout-transition: var(--transition, all 0.25s ease-in-out);
`
