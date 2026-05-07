import styled from 'styled-components'
import { DEVICE_QUERY_MOBILE } from '@/styles/breakpoints'
import CategoryCard from '@/components/CategoryCard'
import {
  PostInfo as CategoryCardPostInfo,
  PublishTime,
  Title,
} from '@/components/CategoryCard/index.style'
import { ButtonStyled } from '../Button/style'
import { Category, CategoryAndPublishTime } from '../SubHeroCard/index.style'

export const OtherCategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 80px;
  margin-top: 80px;
  flex-direction: column;
  @media ${DEVICE_QUERY_MOBILE} {
    width: 100%;
    gap: 48px;
  }
`

export const CategoryName = styled.div`
  font-size: 32px;
  font-weight: 600;
  line-height: 48px;
  height: fit-content;
  padding: 8px 0;
  border-bottom: 1px solid var(--category-border-color);
  color: var(--bd-primary-color);
  @media ${DEVICE_QUERY_MOBILE} {
    font-size: 20px;
    line-height: 30px;
    height: fit-content;
    padding: 16px 0;
  }
`

export const Posts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 48px;
  gap: 48px;
  ${ButtonStyled} {
    width: fit-content;
  }
  ${Category} {
    display: none;
  }
`

export const PostItem = styled(CategoryCard)`
  flex-direction: row-reverse;
  justify-content: space-between;
  width: 100%;
  ${CategoryCardPostInfo} {
    display: flex;
    flex-direction: column;
  }
  ${CategoryAndPublishTime} {
    display: contents;
  }
  ${Category} {
    order: 1;
    width: fit-content;
  }
  ${Title} {
    order: 2;
    width: 560px;
    margin-top: 16px;
  }
  ${PublishTime} {
    order: 3;
    margin-top: 12px;
    color: var(--fg-subtle-color);
  }
  @media ${DEVICE_QUERY_MOBILE} {
    flex-direction: column;
    ${Title} {
      width: 100%;
    }
    ${Title} {
      margin-top: 8px;
    }
    ${PublishTime} {
      margin-top: 6px;
    }
  }
`
