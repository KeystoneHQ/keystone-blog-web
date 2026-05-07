import { DEVICE_QUERY_MOBILE } from '@/styles/breakpoints'
import styled from 'styled-components'

export const MediaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  align-items: center;
  border-radius: 32px;
  gap: 20px;

  button {
    padding: 0;
    border: none;
    background: transparent;
    height: 24px;
    cursor: pointer;
  }

  .icon-swap {
    position: relative;
    display: inline-block;
    width: 24px;
    height: 24px;
  }

  .icon-default,
  .icon-active {
    position: absolute;
    top: 0;
    left: 0;
    transition: opacity 0.2s ease;
  }

  .icon-default {
    opacity: 1;
  }

  .icon-active {
    opacity: 0;
  }

  button:hover .icon-default,
  .icon-button:hover .icon-default {
    opacity: 0;
  }

  button:hover .icon-active,
  .icon-button:hover .icon-active {
    opacity: 1;
  }

  @media ${DEVICE_QUERY_MOBILE} {
    gap: 8px;
    padding: 8px 4px;
    background: #BCC0CC;
    justify-content: space-around;
    .icon-default,
    .icon-active {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: opacity 0.2s ease;
    }

    .icon-default {
      opacity: 0;
    }

    .icon-active {
      opacity: 1;
    }
  }
`
