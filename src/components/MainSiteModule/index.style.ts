import styled from 'styled-components'
import { DEVICE_QUERY_MOBILE } from '../../styles/breakpoints'

export const MainSiteModuleWrapper = styled.div`
  width: 880px;
  height: 270px;
  margin: 120px auto;
  background-color: var(--quote-bg-color);
  & > img {
    position: relative;
    left: 56%;
    top: -124%;
    @media ${DEVICE_QUERY_MOBILE} {
      position: inherit;
      width: 220px;
      height: 220px;
    }
  }
  @media ${DEVICE_QUERY_MOBILE} {
    width: auto;
    padding: 46px 30px 24px 30px;
    display: flex;
    flex-direction: column-reverse;
    height: auto;
    margin: 0 24px;
    align-items: center;
  }
`

export const MainSiteInfo = styled.div`
  font-family: var(--font-neue-kaine);
  padding: 42px 72px;
  @media ${DEVICE_QUERY_MOBILE} {
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin-top: 40px;
  }
`

export const Links = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 16px;

  img {
    display: inline-block;
  }

  a .hovered {
    display: none;
  }

  :hover {
    img {
      display: none;
    }

    img.hovered {
      display: inline-block;
    }
  }

  img {
    position: inherit;
    @media ${DEVICE_QUERY_MOBILE} {
    }
  }
`

export const Title = styled.div`
  margin-bottom: 8px;
  font-size: 24px;
  font-weight: 733;
  line-height: 36px;
  @media ${DEVICE_QUERY_MOBILE} {
    font-size: 18px;
    line-height: 28px;
  }
`

export const Description = styled.div`
  margin-bottom: 24px;
  font-size: 14px;
  font-style: normal;
  font-weight: 733;
  line-height: 22px; /* 157.143% */
  letter-spacing: 0.28px;
  color: var(--fg-subtle-color);
  @media ${DEVICE_QUERY_MOBILE} {
    font-size: 14px;
    line-height: 22px;
  }
`

export const Explore = styled.a`
  font-family: var(--font-montserrat);
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  border: 1.5px solid var(--button-border-color);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 12px 18px 12px 28px;
  text-decoration: none;
  border-image: var(--gd-primary-color) 1;
  background: linear-gradient(90deg, #1d56f5 0%, #00b3f5 100%);
  color: var(--hover-text-color);

  svg {
    transition: transform 0.2s ease;
  }

  &:hover {
    background: linear-gradient(90deg, #1d56f5 0%, #00b3f5 100%);
    color: var(--hover-text-color);

    svg {
      transform: translateX(4px);
    }
  }

  @media ${DEVICE_QUERY_MOBILE} {
    font-size: 14px;
    line-height: 22px;
    padding: 12px 26px;
  }
`

export const Image = styled.img``
